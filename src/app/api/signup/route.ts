import { z } from "zod"
import bcrypt from "bcrypt"

import { supabase } from "../../../../supabase/supabaseClient"


const { data , error } = await supabase.from('todos').select()

const FormSchema = z.object({
  pseudo: z.string().min(1, "Pseudo is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      { message: "Password must contain at least 6 characters, one uppercase letter, one special character, and one number", }
    ),
})

export default async function seedUser(formData: FormData) {

  const formDataObj = {
    id: undefined,                    // auto generated with Prisma
    pseudo: formData.get("pseudo"),
    email: formData.get("email"),
    password: formData.get("password"), 
    createdAt: undefined,             // auto generated with Prisma
  }

  // zod schema validation
  const validationResult = FormSchema.safeParse(formDataObj)

  if (!validationResult.success) {
    throw new Error("Validation error: " + validationResult.error)
  }

  const user = validationResult.data

  const hashedPassword = await bcrypt.hash(user.password, 10)

  const { data, error } = await supabase
    .from('users')
    .insert([{ pseudo: user.pseudo, email: user.email, password: hashedPassword }])

    if (error) {
      throw new Error("Error inserting user: " + error.message)
    }
  
    return data
}
