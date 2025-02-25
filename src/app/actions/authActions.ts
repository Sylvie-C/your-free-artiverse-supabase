import { z } from "zod"
import { NextResponse } from 'next/server'

import { supabase } from "../../../supabase/supabaseClient"
import type { Database } from "../../../supabase/database.types"

import { redirect } from "next/navigation"


const SignupSchema = z.object({
  pseudo: z.string().max(100, "Server Error : pseudo > 100 chars").nullable().or(z.literal("")), 
  email: z.string()
    .min(6, "Server Error: email < 6 chars") 
    .max(100, "Server Error: email > 100 chars") 
    .email("Server Error: invalid email") 
  ,
  password: z.string()
    .min(6, "Server Error: password < 6 chars")
    .max(100, "Server Error: password > 100 chars")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\>\<€§#])[A-Za-z\d@$!%*?&><€§#]{6,}$/, 
      { message: "Server Error : invalid password format", }
    )
    .transform((val) => val.trim()),
})

const LoginSchema = z.object({ 
  email: z.string()
    .max(100, "Server Error: email > 100 chars") 
    .email("Server Error: invalid email") 
  ,
  password: z.string()
    .max(100, "Server Error: password > 100 chars")
    .transform((val) => val.trim()),
})


// Zod server error codes
const ZodErrorCodes = {
  INVALID_EMAIL: 1001,
  INVALID_PASSWORD: 1002,
  INVALID_PSEUDO: 1003,
}

// database types
type signupTypes = Database["public"]["Tables"]["users"]["Insert"]


// Signup Server Action
export const signup = async (formData: signupTypes) => {

  try {

    // zod schema validation
    const validationResult = SignupSchema.safeParse(formData)

    if (!validationResult.success) {
      const zodErrorObj = validationResult.error.format()
      let zodErrorCode 

      if (zodErrorObj.email) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_EMAIL}` }
      else if (zodErrorObj.pseudo) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_PSEUDO}` }
      else if (zodErrorObj.password) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_PASSWORD}` }

      return NextResponse.json(
        { zod_error: zodErrorCode },
        { status: 400 }
      )
    }

    const user = validationResult.data

    // supabase signup
    const { data , error } = await supabase.auth.signUp(
      {
        email: user.email, 
        password: user.password,
        options: {
          data: { pseudo: user.pseudo }, 
        },
      }
    )

    if (error) {
      return NextResponse.json({ error: error.code }, { status: error.status })
    }else{
      return NextResponse.json({ user: data.user }, { status: 201 })
    }  
  }
  catch(error) {
    return NextResponse.json({ error: "Server Internal Error" }, { status: 500 })
  }
}


// Login Server Action
export const login = async (formData: { email:string , password:string }) => {

  try {
    // zod schema validation
    const validationResult = LoginSchema.safeParse(formData)

    if (!validationResult.success) {
      const zodErrorObj = validationResult.error.format()
      let zodErrorCode 

      if (zodErrorObj.email) { zodErrorCode = ZodErrorCodes.INVALID_EMAIL }
      else if (zodErrorObj.password) { zodErrorCode = ZodErrorCodes.INVALID_PASSWORD }
    }

    const user = validationResult.data

    if (!user) {
      return { error: "zod validation error" , status: 400 }
    }

    // supabase login
    const { data , error } = await supabase.auth.signInWithPassword(
      {
        email: user.email, 
        password: user.password,
      }
    )

    if (error) {
      return { error: error.code , status: error.status || 400 }
    }

    const { data: { session } } = await supabase.auth.getSession()

    console.log("session from server ? : " , session)
    console.log ("user email from server Action ? : " , session?.user.email)

    if (data?.session) {
      /* return { session: data.session, status: 200 } // redirect from app layout.tsx */

      return redirect('/dashboard') 
    }

    return { error: 'Authentication failed', status: 401 }


  }
  catch(error) {
    return { error: "Internal Server Error" , status: 500 }
  }
}