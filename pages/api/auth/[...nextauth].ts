import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import crypto from "crypto"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@/lib/prisma"
import bcyrpt from 'bcrypt'
export const authOptions = {
  secret:process.env.NEXTAUTH_SECRET as string,
  adapter:PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 3000,
 } as unknown as any,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as unknown as string,
      clientSecret: process.env.GOOGLE_SECRET as unknown as string,
    }),
    CredentialsProvider({
        name:"Credential",
        credentials:{
            email:{label:"u",type:"text"},
            password:{label:"p",type:"text"}
        },
        async authorize(credentials,req){
          if(!credentials?.email || !credentials?.password){
            return null
          }
          const user = await prisma.user.findUnique({
            where:{
              email : credentials?.email
            }
          })
          if(!user){
            return null
          }
          const password = user?.password as unknown as string
          if(bcyrpt.compareSync(credentials.password,password)){
            return {
              id : user.id,
              email: user.email,
              name : user.name,
              image: user.image
            } 
          }else return null
        }
    })
  ],
}
export default NextAuth(authOptions)