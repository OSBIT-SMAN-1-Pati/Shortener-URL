import { useMutation } from "@tanstack/react-query";
import {Formik,Form,Field} from "formik";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import {prisma} from '@/lib/prisma'
export const getServerSideProps= (async ({req,res})=>{
    const token = getCookie("sessionUser",{req,res})
    const user = await prisma.user.findFirst(
        {
            where: {
                sessionToken:token
            },
        }
    )
    if(user?.sessionToken){
        return {props:{},redirect:{
            permanent:false,
            destination:"/"
        }}
    } else return {props:{}}
}) satisfies GetServerSideProps
export default function Login(){
    const router = useRouter()
    const mutation = useMutation({
        mutationFn:
            async(form:typeof initialValues)=>{
                return await fetch('api/login',{
                    method : "POST",
                    body: JSON.stringify(form)
                }).then(res=>res.json)
                
        },
        onSuccess:async (data:any)=>{
            if(!data.err){
                router.replace('/')
            } else null
        }
    })
    const initialValues={
        email:"",
        password:""
    }
    const onSubmit = async (values:typeof initialValues)=>{
        const {email,password} = values
        const req = {email,password}
        mutation.mutate(req)
    } 
    return(
        <>        
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Field type="text" id="email" name="email" />
                <Field type="text" id="password" name="password" />
                <button type="submit">
                    login
                </button>
                <p>{mutation.data?.message}</p>
            </Form>
        </Formik>
        
        </>

    )
    }
        
    
