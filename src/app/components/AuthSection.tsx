"use client" 

import { useTranslations } from "next-intl"
import { useState , MouseEvent } from "react"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


export default function AuthSection () {

  const t = useTranslations ("AuthSection")
  const [ loginForm , setLoginForm ] = useState <boolean | null> (null)
  const [ showArrow , setShowArrow ] = useState <boolean> (false)

  const formLink = (event: MouseEvent<HTMLElement>) => {

    const target = event.target as HTMLElement | null

    if (target) {
      const link = target.id

      if (link === "login-form") { setLoginForm(true) } 
      else if (link === "signup-form") { setLoginForm(false) }
    }

    setShowArrow (true)
  }

  return (
    <div className="flex flex-col">

      <div className="m-1 md:m-6 flex justify-center">
        {/* Login link */}
        <p 
          id="login-form"
          onClick={ (e) => formLink(e) } 
          className="text-violet-900 dark:text-violet-500 hover:text-orange-500 hover:cursor-pointer underline text-xs sm:text-lg lg:text-lg mx-4"
          role="button"
          tabIndex={0}
          aria-label= { t("loginBtn-ariaLabel") }
        >
          { t ("login-link") } 
        </p>

        {/* Signup link */}
        <p 
          id="signup-form"
          onClick={ (e) => formLink(e) } 
          className="text-pink-700 hover:text-orange-500 hover:cursor-pointer underline text-xs sm:text-lg lg:text-lg mx-4"
          role="button"
          tabIndex={0}
          aria-label= { t("signupBtn-ariaLabel") }
        >
          { t ("signup-link") }
        </p>
      </div>

      { showArrow && 
        <div className="flex justify-center">
          <p className="animate-bounce text-center text-4xl sm:text-6xl w-10 sm:w-14">
            &#8595;
          </p>
        </div>
      }

      { (loginForm !== null) && 
        <section className="flex justify-center text-center">
          { loginForm ? <LoginForm /> : <SignupForm />  } 
        </section> 
      }
    </div>
  )
}