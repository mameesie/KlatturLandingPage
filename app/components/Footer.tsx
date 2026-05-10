'use client'

import Link from "next/link" 
import { useRouter, usePathname } from "next/navigation"
import  useLanguageStore  from '@/store/useStore'

function Footer() {
  const { language } = useLanguageStore()
  const router = useRouter()
  const pathname = usePathname()
  return (

    <div className='shrink-0 mt-auto bg-[#254c5c] text-white font-no-name-regular flex flex-col text-center justify-center leading-[30px] text-[14px] h-[160px]' >
      <p>{language === "nl" ? "Gebaseerd op The Work© van Byron Katie | " : "Based on The Work© by Byron Katie | "}<a href="https://www.thework.com" className='underline'>thework.com</a></p>
      <p className='text-[18px]'> <Link href={`/${language}/privacy`}>Privacy</Link> | <Link href={`/${language}/credits`}>Credits</Link> | <Link href={`/${language}/contact`}>Contact</Link></p>
      <p className='font-open-sans-regular'>© {new Date().getFullYear()} Klattur</p>
    </div>
  )
}

export default Footer