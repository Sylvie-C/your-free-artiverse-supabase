"use client"

import { useState , useEffect } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { signup } from "../actions/authActions"

import EyeIcon from "./EyeIcon"
import Modal from "./Modal"


// Zod client schema Getter
const getFormSchema = (t: (key: string) => string) => (
  z.object({
    pseudo: z.string().max(100, t("pseudoMax")).nullable().or(z.literal("")), 
    email: z.string()
      .min(6, t("emailMin")) 
      .max(100, t("emailMax")) 
      .email(t("emailError")) 
    ,
    pwd01: z.string()
      .min(6, t("passwordMin"))
      .max(100, t("passwordMax"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\>\<€§#])[A-Za-z\d@$!%*?&><€§#]{6,}$/,
        { message: t("passwordError"), }
      )
      .transform((val) => val.trim())
      ,
      pwd02: z.string()
      .min(6, t("passwordConfirm"))
      .max(100, t("passwordMax"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\>\<€§#])[A-Za-z\d@$!%*?&><€§#]{6,}$/,
        { message: t("passwordError"), }
      )
      .transform((val) => val.trim())
      ,
  }).refine(
    (data) => data.pwd01 === data.pwd02, 
    {
      message: t("passwordMatch"),
      path: ["pwd02"], 
    }
  )
)

// TypeScript form schema
interface SignupFormData {
  email: string;
  pseudo?: string | null;
  pwd01: string;
  pwd02: string;
}


export default function SignupForm () {

  const t = useTranslations("SignupForm")

  const [ pwd01Visibility , setPwd01Visibility ] = useState (false)
  const [ pwd02Visibility , setPwd02Visibility ] = useState (false)
  const [ instructions , showInstructions ] = useState (false)

  const [ loading, setLoading ] = useState (false)
  const [ error, setError ] = useState <string | null>(null)    // inline message error ()

  const [ modalError , setModalError ] = useState <string | null>(null)     // modal message error (serious errors)
  const [ modalContent , setModalContent ] = useState <React.ReactNode | null> (null)
  const [ registered , setRegistered ] = useState(false)

  // Form handling with useForm()
  const { 
    register, 
    handleSubmit, 
    reset,
    watch, 
    formState: { errors: rhf_errors }, 
  } = useForm ({
    resolver: zodResolver(getFormSchema(t)),
    mode: "onBlur",
  })

  const showPassword01 = (value: boolean) => {
    if (value) { setPwd01Visibility (true) ; }
    else { setPwd01Visibility (false) ; }
  }

  const showPassword02 = (value: boolean) => {
    if (value) { setPwd02Visibility (true) ; }
    else { setPwd02Visibility (false) ; }
  }

  const onSubmit = async (data : SignupFormData ) => {

    try {
      setLoading(true)

      const newUser = {
        email: data.email,
        password: data.pwd02,
        pseudo: data.pseudo,
      }

      // Signup with SupabaseAuth (server action)
      const response = await signup(newUser)
  
      const result = await response.json()

      // server errors handling
      if (!response.ok) { 

        // resets
        setError(null)
        setModalError(null)

        // Serious errors from server side (HTTP 5xx)
        if (response.status >= 500 && response.status < 600) {
          setModalError(t("signupError"))
        }

        // Zod errors from server side
        else if (result.zod_error) {
          switch (result.zod_error) {
            case 1001 : 
              setError ( t("emailError") )
              break
            case 1002 : 
              setError ( t("passwordError"))
              break
            case 1003 : 
              setError ( t("pseudoError") )
              break
            default:
              setError(t("signupError"))
          }
        }

        // email duplicity errors
        else if ( response.status === 422 ) {
          if (result.error.includes("user_already_exists")) {
            setError(t("emailExists"))
          }
        }
      }else{
        reset()
        setRegistered(true)
        setError(null)
        setModalError(null)
      }

    } catch (error) {
      console.error(error)
      setModalError(t("signupError"))
    } finally {
      setLoading(false)
    }
  }

  // modal message for server error 5xx type
  useEffect (
    () => {
      setModalContent (
      <p className="text-2xl">{modalError}</p>
    )
    }, [modalError]
  )

  // reset successfull registration message if new form entry
  const watchedFields = watch()
  useEffect(
    () => {
      if (Object.values(watchedFields).some(value => value)) {
        setRegistered(false)
      }
    }, [watchedFields]
  )


  return(
    <>
      <Modal jsxContent= { modalContent } show={ modalError ? true : false } />
      <form
        onSubmit={ handleSubmit(onSubmit) } 
        className="p-4 m-4 w-72 sm:w-[600px] flex flex-col items-center rounded-md 
        bg-gradient-to-bl from-violet-300 from-30% via-orange-300 via-70% to-pink-200 to-100% 
        dark:from-violet-900 dark:via-orange-700 dark:to-pink-700"
      >
        <h2 className="my-4 text-2xl font-bold"> { t("signupform-title") } </h2>
  
        <div className="w-full flex flex-col gap-y-2">
          {/* Email input */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label className="sm:col-span-1 justify-self-start">Email : </label>
            <input
              required
              type="email"
              className="sm:col-span-2 rounded-md px-2 mx-2"
              {...register("email")}
            />
          </div>
          {rhf_errors.email && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.email.message}</p>}
  
          {/* Pseudo input */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label className="sm:col-span-1 justify-self-start"> 
              { t("pseudoLabel") } : 
            </label>
            <input
              type="text"
              className="sm:col-span-2 rounded-md px-2 mx-2"
              {...register("pseudo")}
            />
          </div>
          {rhf_errors.pseudo && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.pseudo.message}</p>}
    
          {/* Password */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label className="col-span-1 justify-self-start ">
              { t("pwd01Label") } : 
            </label>
  
            <div className="flex flex-col sm:flex-row">
              <div className="relative">
                <input
                  required
                  type= { pwd01Visibility ? "text" : "password" }
                  className="rounded-md px-2 mx-2"
                  {...register("pwd01" , { required: t("passwordMin") }  )}
                />
  
                <div className= { `absolute top-0 left-0 bg-white dark:bg-black p-2 text-left origin-top transition-transform duration-300 ease-in-out ${ instructions ? "scale-y-100" : "scale-y-0" }` }> 
                  <span
                    className="formIconBtn role='button'"
                    tabIndex={0}
                    onClick={ () => instructions ? showInstructions(false) : showInstructions(true) }
                  >X</span>
  
                  <p>{ t("password-instructions") } </p>
                </div>
  
              </div>
  
              <div className="flex mt-2 sm:mt-0">
                <EyeIcon eyeClicked={ showPassword01 }/>
                <span 
                  className="formIconBtn role='button'"
                  tabIndex={0}
                  onClick={ () => instructions ? showInstructions(false) : showInstructions(true) }
                >
                  ?
                </span>
              </div>
            </div>
          </div>
          {rhf_errors.pwd01 && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.pwd01.message}</p>}
    
          {/* Password Confirm */}
          <div className="grid grid-cols-[minmax(0, max-content)] sm:grid-cols-[250px_1fr_10px]">
            <label className="col-span-1 justify-self-start ">
              { t("pwd02Label") } : 
            </label>
  
            <div className="flex flex-col sm:flex-row">
              <input
                required
                type= { pwd02Visibility ? "text" : "password" }
                className="rounded-md px-2 mx-2"
                { ...register( 
                    "pwd02" , 
                    { required: t("passwordConfirm") } , 
                  ) 
                }
              />
  
              <div className="flex mt-2 sm:mt-0">
                <EyeIcon eyeClicked={ showPassword02 }/>
                <span 
                  className="formIconBtn role='button'"
                  tabIndex={0}
                  onClick={ () => instructions ? showInstructions(false) : showInstructions(true) }
                >
                  ?
                </span>
              </div>
            </div>
          </div>
          {rhf_errors.pwd02 && <p className="text-red-500 bg-white dark:bg-black">{rhf_errors.pwd02.message}</p>}
        </div>
  
        { error && <p className="p-2 m-2 text-red-500 bg-black">{error}</p> }
        { registered ? <p className="p-1 m-1 text-emerald-950 bg-emerald-200"> { t("signupSuccess") } </p> : null }

        <button type="submit" className="w-fit" disabled={loading}>
          {loading ? "Loading..." : "OK"}
        </button>
      </form>
    </>
  )
}