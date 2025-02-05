'use client'

import { usePathname , useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'


export default function LangBtn() {
  const t = useTranslations("HomePage")
  const pathname = usePathname()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = pathname.startsWith('/en') ? 'fr' : 'en'
    const newPath = pathname.replace(/^\/(en|fr)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button onClick={toggleLanguage} className="hover:shadow-btnShadowDark"> { t("toggle-lang") } </button>
  )
}