
import React from 'react'
import { Link as I18nLink } from "@/i18n/routing"
import Link from "next/link"
import { getTranslations } from 'next-intl/server'
async function StartPage() {
const t  = await getTranslations("start")
  return (
    <div className='flex flex-col'>
      <div className='flex  justify-between font-open-sans-regular text-white md:text-[18px] p-[15px]  md:px-[25px] md:pt-[40px]'>
        <I18nLink href='/' className='cursor-pointer' >← {t('back')}</I18nLink>
        <p>{t('general')}</p>
      </div>
      <div className='flex flex-col items-center mt-[60px]'>
        <p className='mx-[80px] max-w-[405px] font-open-sans-regular text-white'>
          {t('sound')} <br /><br />
          {t('instructions')}
        </p>
        <Link href='/session'
          
          className=" cursor-pointer bg-[#9ACC8F] hover:bg-[#aad2a2] font-no-name-regular text-[19px] text-[#56710C] flex items-center justify-center my-[70px]  rounded-[2000px] w-[180px] h-[60px] hover:scale-105 active:scale-100"
        >
          {t('play')}
        </Link>
      </div>

    </div>
  )
}

export default StartPage