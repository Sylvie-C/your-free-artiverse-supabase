"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import EyeIcon from "./EyeIcon"


export default function LoginForm () {

  const t = useTranslations ("LoginForm")
  const [ pwdVisibility , setPwdVisibility ] = useState(false)
  const [ message , setMessage ] = useState (null)

  const showPassword = (value: boolean) => {
    if (value) { setPwdVisibility (true) ; }
    else { setPwdVisibility (false) ; }
  }

  const [formData, setFormData] = useState({
    email: '',
    pwd: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    let formValid = true

    if (formValid) {
      console.log('Formulaire soumis. FormData ? : ', formData)

    }
  }


  return (
    <form 
      onSubmit={ handleSubmit } 
      className="p-4 m-4 w-[600px] flex flex-col items-center rounded-md 
      bg-gradient-to-bl from-violet-300 from-30% via-orange-300 via-70% to-pink-200 to-100% 
      dark:from-violet-900 dark:via-orange-700 dark:to-pink-700
      "
    >
      <h2 className="my-4 text-2xl font-bold"> { t("loginform-title") } </h2>

      <div className="flex flex-col gap-y-2">
        <div className="grid grid-cols-[150px_1fr_10px]">
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
        <div className="grid grid-cols-[150px_1fr_10px]">
          <label htmlFor="password" className="col-span-1 justify-self-start ">
            { t("form-pwdLabel") } : 
          </label>
          <div className="flex">
            <input
              required
              type= { pwdVisibility ? "text" : "password" }
              id="pwd"
              name="pwd"
              value={formData.pwd}
              onChange={ handleChange }
              className="rounded-md px-2 mx-2"
            />
            <EyeIcon eyeClicked={ showPassword }/>
          </div>
        </div>
      </div>

      <button type="submit" className="w-fit">OK</button>
    </form>
  )
}