
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'

import Header from '../components/Header'

 
export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <Header />
      <div>
        <h1>{t('title')}</h1>
        <Link href="/about">{t('about')}</Link>
      </div>
    </>
  );
}