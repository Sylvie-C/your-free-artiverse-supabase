import path from 'path'

const localesPath = process.env.LOCALES_PATH
if (!localesPath) {
  throw new Error("LOCALES_PATH environment variable is not defined")
}

const nextI18NextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    localeDetection: false as false,
  },
  localePath: path.resolve(localesPath),
}

export default nextI18NextConfig
