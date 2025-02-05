import { useTranslations } from 'next-intl'

import Header from '../components/Header'
import AuthSection from '../components/AuthSection'

 
export default function HomePage() {

  const t = useTranslations('HomePage')

  return (
    <>
      <Header />
      <div className="text-center flex flex-col items-center">
        <h1 className="m-12 text-3xl sm:text-5xl sm:tracking-wider lg:text-6xl lg:tracking-mainTitle">
          <span className="text-pink-700">Your</span>&nbsp;
          <span className="text-orange-500">Free</span>&nbsp;
          <span className="text-violet-500">Artiverse</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl lg:leading-8"> { t("subtitle") } </p>
      </div>

      <AuthSection />
    </>
  )
}