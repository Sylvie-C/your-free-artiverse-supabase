"use client" 

import { useTranslations } from "next-intl"
import { useState } from "react"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


export default function AuthSection () {

  const t = useTranslations ("AuthSection")
  const [ loginForm , setLoginForm ] = useState <boolean | null> (null)

  return (
    <div>
      <button onClick={ () => { setLoginForm (true) } }> { t ("login-link") } </button>
      <button onClick={ () => { setLoginForm (false) } }> { t ("signup-link") } </button>
      { (loginForm !== null) && <div> { loginForm ? <LoginForm /> : <SignupForm />  } </div> }
    </div>
  )
}