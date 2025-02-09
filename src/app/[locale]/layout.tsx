import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import "../../globals.css"

interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}


export default async function LocaleLayout({ children , params } : LayoutProps ) {

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
