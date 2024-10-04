import { z } from "zod";

export const loginSchema =  z.object({
    email : z.string().email(),
    password : z.string().min(4)
})

export type loginType = z.infer<typeof loginSchema>

export const signupSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(4)
})

export type signupType = z.infer<typeof signupSchema>