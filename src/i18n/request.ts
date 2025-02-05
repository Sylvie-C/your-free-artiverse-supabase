import {getRequestConfig} from 'next-intl/server'
import {routing} from './routing'
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale

  console.log ("locale depuis request.ts ? : " , locale)
 
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})