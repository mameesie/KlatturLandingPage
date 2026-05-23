import { getTranslations } from 'next-intl/server'
import React from 'react'
import { Metadata } from 'next'
import { buildLocalizedMetadata } from "@/app/seo"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("privacy")

  return buildLocalizedMetadata({
    locale: params.locale,
    title: t("meta-title"),
    description: t("meta-description"),
    pathname: "/privacy",
  })
}

async function privacyPage() {
const t  = await getTranslations("privacy")
  
  return (
    <div className='bg-tiles-light-blue font-open-sans-regular flex-1 flex flex-col justify-center items-center md:items-start '>
      <div className='mb-[100px] mt-[60px] sm:mt-[100px] mx-[40px] md:mx-[120px] lg:mx-[240px]'>
        <p className='font-bold text-[#254c5c]'>Privacy</p> <br/>
        <p className='text-[#254c5c] ml-[50px] md2:leading-[35px]'>{t('respect')}<br/><br/>
                                        <b>{t('data')}</b><br/><br/>
                                        <i>{t('feedback')}</i><br/>
                                        {t('name')}<br/>
                                        {t('message')}<br/>
                                        {t('use')}<br/><br/>
                                        <i>Cookies</i><br/>
                                        {t('tracking')}<br/>
                                        {t('anonym')}<br/><br/>
                                        {t('last')}<br/></p>
      </div>
    </div>
  )
}

export default privacyPage
