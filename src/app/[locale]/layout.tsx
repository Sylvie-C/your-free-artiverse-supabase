import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'

import "../../globals.css"


export default async function LocaleLayout({ children , params }
  : { children: React.ReactNode; params: {locale: string}; } ) {

    const { locale } = await params

  if (!routing.locales.includes(locale as any)) { notFound() }
 
  const messages = await getMessages()
 
  return (
    <html lang={locale}>
      <body className="max-w-screen-2xl m-auto p-0 bg-mainLight text-mainDark dark:bg-mainDark dark:text-mainLight">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
