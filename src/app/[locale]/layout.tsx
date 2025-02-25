import { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'

import { notFound } from 'next/navigation'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import "../../globals.css"


interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}


export default async function LocaleLayout({ children , params } : LayoutProps ) {

  const { locale } = await params

  if (!routing.locales.includes(locale as any)) { notFound() }
 
  const messages = await getMessages()


/* 
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  redirect("/dashboard")
 */
 
  return (
    <html lang={locale}>
      <body className="box-border max-w-screen-2xl m-auto p-0 bg-mainLight text-mainDark dark:bg-mainDark dark:text-mainLight">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
