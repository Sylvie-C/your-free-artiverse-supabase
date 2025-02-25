import { z } from "zod"
import { NextResponse } from 'next/server'

import { supabase } from "../../../../supabase/supabaseClient"
import type { Database } from "../../../../supabase/database.types"


const FormSchema = z.object({
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

// Zod server error codes
const ZodErrorCodes = {
  INVALID_EMAIL: 1001,
  INVALID_PASSWORD: 1002,
  INVALID_PSEUDO: 1003,
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
      else if (zodErrorObj.pseudo) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_PSEUDO}` }
      else if (zodErrorObj.password) { zodErrorCode = `Server Error : ${ZodErrorCodes.INVALID_PASSWORD}` }

      return NextResponse.json(
        { zod_error: zodErrorCode },
        { status: 400 }
      )
    }

    const user = validationResult.data

    // TypeScript validation
    const ts_user: Database["public"]["Tables"]["users"]["Insert"] = {
      email: user.email,
      password: user.password,
      pseudo: user.pseudo,
    }

    if (!ts_user) {
      return NextResponse.json({ error: "TypeScript Server Error : invalid data type" } , { status: 400 })
    }

    // supabase signup
    const { data , error } = await supabase.auth.signUp(
      {
        email: ts_user.email, 
        password: ts_user.password,
        options: {
          data: { pseudo: ts_user.pseudo }, 
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
