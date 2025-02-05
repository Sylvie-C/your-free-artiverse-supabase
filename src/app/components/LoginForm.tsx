"use client"
import { useTranslations } from "next-intl"
import { Link } from '@/i18n/routing'


export default function LoginForm () {

  const t = useTranslations ("AuthSection")

  return (
    <form className="flex flex-col">
      <h2> { t("loginform-title") } </h2>


      <Link href="/private"> test acces route /private </Link>
    </form>
  )
}