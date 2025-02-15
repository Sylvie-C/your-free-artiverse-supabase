"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { PrismaClient } from '@prisma/client'

import EyeIcon from "./EyeIcon"


const prisma = new PrismaClient()


export default function SignupForm () {

  const t = useTranslations("SignupForm")

  const [ pwd01Visibility , setPwd01Visibility ] = useState (false)
  const [ pwd02Visibility , setPwd02Visibility ] = useState (false)
  
  // submitted form data
  const [formData, setFormData] = useState ( { email: '', pseudo: '', pwd01: '', pwd02: '', } )

  const [loading, setLoading] = useState (false);
  const [error, setError] = useState <string | null>(null)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const showPassword01 = (value: boolean) => {
    if (value) { setPwd01Visibility (true) ; }
    else { setPwd01Visibility (false) ; }
  }

  const showPassword02 = (value: boolean) => {
    if (value) { setPwd02Visibility (true) ; }
    else { setPwd02Visibility (false) ; }
  }

  const comparePwds = (pwd01:string , pwd02:string) => {
    pwd01 = pwd01.trim()
    pwd02 = pwd02.trim()

    if (pwd01 === "" || pwd02 === "") {
      alert( t("alertEmptyPassword") )
    }

    if (pwd01 === pwd02) { return true }
    else { return false }
  }

  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault()

    const comparePasswords = comparePwds(formData.pwd01 , formData.pwd02)
    if (!comparePasswords) alert( t("alertComparePasswords") )

    try {

      // Prisma data schema with submitted form Data
      const newUser = await prisma.user.create({
        data: {
          email: formData.email,
          pseudo: formData.pseudo,
          password: formData.pwd01,
        },
      })

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'supabaseAnonKey': 'NEXT_SUPABASE_ANON_KEY'
        },
        body: JSON.stringify( { newUser } ),
      })




  
      if (!response.ok) { throw new Error('Error during registration') }
  
      const result = await response.json()

      console.log('Success server response : ', result)

    } catch (error) {

        console.log ("erreur depuis le catch ? : " , error)
        console.error('Error during registration', error)
        setError(t("signupError"))

    } finally {

        setLoading(false)
        await prisma.$disconnect()

    }

  }


  return(
    <form
      onSubmit={ handleSubmit } 
      className="p-4 m-4 w-[600px] flex flex-col items-center rounded-md 
      bg-gradient-to-bl from-violet-300 from-30% via-orange-300 via-70% to-pink-200 to-100% 
      dark:from-violet-900 dark:via-orange-700 dark:to-pink-700
      "
    >
      <h2 className="my-4 text-2xl font-bold"> { t("signupform-title") } </h2>

      <div className="flex flex-col gap-y-2">
        {/* Email input */}
        <div className="grid grid-cols-[250px_1fr_10px]">
          <label htmlFor="email" className="col-span-1 justify-self-start">Email : </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={ handleChange }
            className="col-span-2 rounded-md px-2 mx-2"
          />
        </div>

        {/* Pseudo input */}
        <div className="grid grid-cols-[250px_1fr_10px]">
          <label htmlFor="text" className="col-span-1 justify-self-start"> 
            { t("pseudoLabel") } : 
          </label>
          <input
            required
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={ handleChange }
            className="col-span-2 rounded-md px-2 mx-2"
          />
        </div>
  
        {/* Password */}
        <div className="grid grid-cols-[250px_1fr_10px]">
          <label htmlFor="password" className="col-span-1 justify-self-start ">
            { t("pwd01Label") } : 
          </label>
          <p> { t("password-instructions") } </p>
          <div className="flex">
            <input
              required
              type= { pwd01Visibility ? "text" : "password" }
              id="pwd01"
              name="pwd01"
              value={formData.pwd01}
              onChange={ handleChange }
              className="rounded-md px-2 mx-2"
            />
            <EyeIcon eyeClicked={ showPassword01 }/>
          </div>
        </div>
  
        {/* Password Confirm */}
        <div className="grid grid-cols-[250px_1fr_10px]">
          <label htmlFor="password" className="col-span-1 justify-self-start ">
            { t("pwd02Label") } : 
          </label>
          <div className="flex">
            <input
              required
              type= { pwd02Visibility ? "text" : "password" }
              id="pwd02"
              name="pwd02"
              value={formData.pwd02}
              onChange={ handleChange }
              className="rounded-md px-2 mx-2"
            />
            <EyeIcon eyeClicked={ showPassword02 }/>
          </div>
        </div>
      </div>

      <button type="submit" className="w-fit">OK</button>
    </form>
  )
}