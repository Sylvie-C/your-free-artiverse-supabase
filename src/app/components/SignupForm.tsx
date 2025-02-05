"use client"
import { useTranslations } from "next-intl"


export default function SignupForm () {

  const t = useTranslations("AuthSection")

  return(
    <form>
      <h2> { t("signupform-title") } </h2>
    </form>
  )
}