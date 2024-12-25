import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signinInput,signupInput} from '@rdevs/medium-common'

export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
  }>();

//signup
userRouter.post('/signup',async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const body= await c.req.json();
   const { success}=signupInput.safeParse(body)
   if(!success){
    c.status(411);
    return c.json({
      message:"Inputs are not correct"
    })
   }
  try{
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token})
  }catch(e){
    c.status(403)
    return c.json({message:"user exists"})
  }
  })
  //signin
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(400)
      return c.json({error:"Inputs not correct"})
    }
    const user=await prisma.user.findUnique({
      where:{
        email:body.email
        
      }
    })
    if(!user){
      c.status(403)
      return c.json({message:"user not found"})
    }
    const jwt=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt})
  
  })