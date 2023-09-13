import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import crypto from "crypto"
import {setCookie} from "cookies-next" 
import {prisma} from "@/lib/prisma"
type ResponseData = {
    messagge:string
}
export default async function handler(req: NextApiRequest,
    res: NextApiResponse<ResponseData>){
      if(!req.body){
         res.status(400).json({messagge:"Can't process the request"})
      }
      const {username,email,password} = JSON.parse(req.body) 
      const hash = bcrypt.hashSync(password,10)
    const user = await prisma.user.create({
        data:{
            name:username,
            email,
            password:hash,
            sessionToken: crypto.randomBytes(48).toString("hex"),
            sessionExpired: new Date(Date.now()+1000*60*60*24)
        }   
    }
    )
    setCookie("sessionUser",user.sessionToken,{req,res})
    res.status(200).end()
}  
     
