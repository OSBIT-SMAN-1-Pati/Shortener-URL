import { useFormik,Formik,Form,Field,ErrorMessage} from "formik";
import * as yup from "yup"
import type { GetServerSideProps } from "next";
import {getCookie} from "cookies-next";
import {prisma} from "@/lib/prisma"
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

export default function SignUp(){
    const initialValues={
        username:"",
        email:"",
        password:"",
        passwordConfirmation:""
    }
    const onSubmit = async (values:{email:string,password:string,username:string})=>{
        const {email,password,username} = values
        const req = {email,password,username}
        try {
            const res:any = fetch("/api/signup",{
            method:"POST",
            body:JSON.stringify(req)
        })
        console.log("Ok")
    }catch(_){
        throw _
    } 
    }
    
    const validation = yup.object().shape({
        username: yup.string().max(12,"Username can't have character above 12").required("Required"),
        email: yup.string().email("Invalid Email Address").required("Required"),
        password: yup.string().required("Required"),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')],"Password must match").required("Required")
    })
        
    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
            <Form className="flex flex-col w-96">
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username"/>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email"/>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password"/>
                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                <Field type="password" id="passwordConfirmation" name="passwordConfirmation" />
                <ErrorMessage name="passwordConfirmation"/>
                <button type="submit">
                    Sign Up
                </button>
            </Form>
        </Formik>
    )
}