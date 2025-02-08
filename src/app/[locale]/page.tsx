import { useTranslations } from 'next-intl'

import Header from '../components/Header'
import AuthSection from '../components/AuthSection'


import MainTitle from '../components/MainTitle'

 
export default function HomePage() {

  const t = useTranslations('HomePage')

  return (
    <>
      <Header />
      <div className="text-center flex flex-col items-center my-2">

        <MainTitle word01="Your" word02="Free" word03="Artiverse" />

        <div className="w-full h-36 grid items-center">
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl">
            { t("subtitle") }
          </p>
        </div>
      </div>
      <AuthSection />
    </>
  )
}