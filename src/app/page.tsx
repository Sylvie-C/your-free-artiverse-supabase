import { useTranslation } from "next-i18next"

import Header from "./components/Header"

export default function Home() {

  const { t } = useTranslation ("common")



  return (
    <>
      <Header />
      <main>
      <p>{t('welcome_message')}</p>
      </main>
      <footer>
        
      </footer>
    </>
  )
}
