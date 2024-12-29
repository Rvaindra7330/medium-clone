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
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  console.log("auth",authHeader)
  try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        //@ts-ignore
          c.set("userId", user.id);
          await next();
      } else {
          c.status(403);
          return c.json({
              message: "You are not logged in"
          })
      }
  } catch(e) {
      c.status(403);
      return c.json({
          message: "You are not logged "
      })
  }
});
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
     const blogs=await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
     })
    return c.json({blogs})
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
            },
            select:{
              id:true,
              title:true,
              content:true,
              author:{
                select:{
                  name:true
                }
              }
            }
         })
        return c.json({post})
     }catch(e){
        c.status(411)
        return c.json({message:"error while fetchong blog post"})
     }
    
    
  })
 