import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@rdevs/medium-common";


 export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string;
      JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
  }>();
//middleware
  blogRouter.use('/*',async(c,next)=>{
    const jwt=c.req.header("authorization");
    //@ts-ignore
    // const jwt=header.split(" ")[1];
    if(!jwt){
      c.status(403)
      return c.json({error:"unauthorized"})
    }
    
   try{
    const valid=await verify(jwt,c.env.JWT_SECRET)
    console.log(valid.id)
    if(valid){
        //@ts-ignore
        c.set("userId",valid.id)
        await next()
    }
    else{
      c.json({error:"Invalid user"})
    }
   }catch(e){
    return c.json({message:"Invalid User"})
   }
    
    
  })
//blog post
blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     const body= await c.req.json();
     const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(400)
      return c.json({error:"Inputs not correct"})
    }
     const authId=c.get("userId")
    //  const authorId=c.get(userId)
     const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(authId)
        }
     })
    return c.json({id:post.id})
    
  })
  blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     const body= await c.req.json();
     const {success} = updateBlogInput.safeParse(body)
    if(!success){
      c.status(400)
      return c.json({error:"Inputs not correct"})
    }
     const post=await prisma.post.update({
        where:{
            id:body.id    
            },
            data:{
                title:body.title,
                content:body.content
            }
     })
    return c.json({id:post.id})
    
  })
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     const blog=await prisma.post.findMany()
    return c.json({blog})
  })
  blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     const id=c.req.param("id")
     try{
        const post=await prisma.post.findFirst({
            where:{
                id:Number(id)
            }
         })
        return c.json({post})
     }catch(e){
        c.status(411)
        return c.json({message:"error while fetchong blog post"})
     }
    
    
  })
 