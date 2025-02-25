import { z } from "zod"
import { NextResponse } from 'next/server'

import { supabase } from "../../../../supabase/supabaseClient"


// Zod server schema
const FormSchema = z.object({ 
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
}

export const POST = async (req: Request) => {

  try {
    const formDataObj = await req.json()

    // zod schema validation
    const validationResult = FormSchema.safeParse(formDataObj)

    if (!validationResult.success) {
      const zodErrorObj = validationResult.error.format()
      let zodErrorCode 

      if (zodErrorObj.email) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_EMAIL}` }
      else if (zodErrorObj.password) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_PASSWORD}` }

      return NextResponse.json(
        { zod_error: zodErrorCode },
        { status: 400 }
      )
    }

    const user = validationResult.data

    if (!user) {
      return NextResponse.json({ error: "TypeScript Server Error : invalid data type" } , { status: 400 })
    }

    // supabase login
    const { data , error } = await supabase.auth.signInWithPassword(
      {
        email: user.email, 
        password: user.password,
      }
    )

    console.log ( "data from server login route ? : " , data)
    console.log ( "error from server login route ? : " , error)

    if (error) {
      return NextResponse.json({ error: error.code }, { status: error.status })
    }else{
      return NextResponse.json({ user: data.user }, { status: 200 })
    } 

  }
  catch(error) {
    return NextResponse.json({ error: "Server Internal Error" }, { status: 500 })
  }
}