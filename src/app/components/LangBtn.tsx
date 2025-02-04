'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './Button'

export default function LangBtn() {
  const pathname = usePathname()

  return (
    <div className="flex gap-2">
      <Link href={pathname} locale="en">
        <Button variant={pathname.startsWith('/en') ? 'default' : 'outline'}>
          English
        </Button>
      </Link>
      <Link href={pathname} locale="fr">
        <Button variant={pathname.startsWith('/fr') ? 'default' : 'outline'}>
          Français
        </Button>
      </Link>
    </div>
  )
}