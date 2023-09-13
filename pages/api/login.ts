import type { NextApiRequest, NextApiResponse } from 'next'
import {setCookie} from "cookies-next" 
import { prisma } from '@/lib/prisma'
import bcyrpt from 'bcrypt'
type ResponseData = {
    message:string
    err:boolean
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>){
      const {email,password} = JSON.parse(req.body)
      const user = await prisma.user.findFirst({
         where:{
            email
         }
      })
      if(bcyrpt.compareSync(password,user?.password!)){
         await prisma.user.update({
            where:{
               email
            },
            data:{
               sessionExpired: new Date(Date.now() + 1000 * 60 *60 *24)
            }
         })
         setCookie("sessionUser",user?.sessionToken,{req,res})
         res.status(200).end()
      } else res.status(401).json({message:"Wrong Password or Email",err:true})
     } 
