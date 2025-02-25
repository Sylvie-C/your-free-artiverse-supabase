"use client"

import { useState , useEffect } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { login } from "../actions/authActions"

import EyeIcon from "./EyeIcon"
import Modal from "./Modal"


// Zod client schema Getter
const getFormSchema = (t: (key: string) => string) => (
  z.object({ 
    email: z.string()
      .max(100, t("emailMax")) 
      .email(t("emailError")) 
    ,
    password: z.string()
      .max(100, t("passwordMax"))
      .transform((val) => val.trim()), 
  })
)

// TypeScript form schema
interface LoginFormData {
  email: string;
  password: string;
}


export default function LoginForm () {

  const t = useTranslations ("LoginForm")

  const [ pwdVisibility , setPwdVisibility ] = useState(false)

  const [ loading, setLoading ] = useState (false)
  const [ error, setError ] = useState <string | null>(null) 

  const [ modalError , setModalError ] = useState <string | null>(null) 
  const [ modalContent , setModalContent ] = useState <React.ReactNode | null> (null)

  const [ auth , setAuth ] = useState(false)

  // Form handling with useForm()
  const { 
    register, 
    handleSubmit, 
    formState: { errors: rhf_errors }, 
  } = useForm ({
    resolver: zodResolver(getFormSchema(t)),
    mode: "onBlur",
  })


  const showPassword = (value: boolean) => {
    if (value) { setPwdVisibility (true) ; }
    else { setPwdVisibility (false) ; }
  }

  const onSubmit = async (data: LoginFormData) => {
    const loginData = {
      email: data.email,
      password: data.password
    }

    try {
      // Login with SupabaseAuth (server action)
      const response = await login(loginData)

      console.log ("response from client side ? : " , response)

      // if login not successful, handle errors
      if (response.status !== 200 && response.error !== undefined && response.status !== undefined) {
        setError(null)
        setModalError(null)

        switch (true) {
          // Serious errors from server side (HTTP 5xx)
          case (response.status>=500 && response.status<600): 
            setModalError ( t("loginServerError") )
            break;

          // Zod errors from server side
          case (response.status === 1001): 
            setError( t("emailError") )
            break;

          case (response.status === 1002): 
            setError ( t("passwordError") )
            break;

          // email duplicity error
          case (response.status === 422): 
            if (response.error.includes("user_already_exists")) {
              setError(t("emailExists"))
            }
            break;

          // wrong credentials
          case (response.error.includes ("invalid_credentials")) : 
            setError ( t("loginCredentials") )
            break; 

          // unknown error
          default: 
            setError( t("loginUnknownError") )
        }
      }

/*    // re-render caused by State update -> prevent redirection from Server Action
      if (response.status === 200) { 
        setError(null)
        setModalError(null)
        setAuth(true) 
      } 
*/

    }
    catch(error) {
      console.error(`Login error : ${error}`), 
      setError( t("loginError") )
    }
    finally {
      setLoading(false)
    }
  } 

  useEffect (
    () => {
      setModalContent (
      <p className="text-2xl">{modalError}</p>
    )
    }, [modalError]
  )


  return (
    <>
      <Modal jsxContent= { modalContent } show={ modalError ? true : false } />
      <form 
        onSubmit={ handleSubmit(onSubmit) } 
        className="p-4 m-4 w-72 sm:w-[600px] flex flex-col items-center rounded-md 
        bg-gradient-to-bl from-violet-300 from-30% via-orange-300 via-70% to-pink-200 to-100% 
        dark:from-violet-900 dark:via-orange-700 dark:to-pink-700"
      >
        <h2 className="my-4 text-2xl font-bold"> { t("loginForm-title") } </h2>
  
        <div className="w-full flex flex-col gap-y-2">

          {/* Email field */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label htmlFor="email" className="col-span-1 justify-self-start">Email : </label>
            <input
              required
              type="email"
              className="sm:col-span-2 rounded-md px-2 mx-2"
              {...register("email")}
            />
          </div>
          {rhf_errors.email && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.email.message}</p>}

          {/* Password field */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label htmlFor="password" className="col-span-1 justify-self-start ">
              { t("form-pwdLabel") } : 
            </label>
            <div className="flex flex-col items-start sm:flex-row">
              <input
                required
                type= { pwdVisibility ? "text" : "password" }
                className="rounded-md px-2 mx-2"
                {...register("password")}
              />
              <EyeIcon eyeClicked={ showPassword }/>
            </div>
          </div>
          {rhf_errors.password && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.password.message}</p>}

        </div>
  
        { 
          error 
/*           ? <p className="p-2 m-2 text-red-500 bg-black">{error}</p> 
          : auth && <p className="p-1 m-1 text-emerald-950 bg-emerald-200"> { t("loginSuccess") } </p> */
          && <p className="p-2 m-2 text-red-500 bg-black">{error}</p>
        }

        <button type="submit" className="w-fit" disabled={loading}>
          {loading ? "Loading..." : "OK"}
        </button>
      </form>
    </>
  )
}