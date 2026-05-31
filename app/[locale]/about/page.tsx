import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { buildLocalizedMetadata } from "@/app/seo"

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("about")

  return buildLocalizedMetadata({
    locale,
    title: t("meta-title"),
    description: t("meta-description"),
    pathname: "/about",
  })
}

async function AboutPage() {
  const t  = await getTranslations("about")
  return  (
    <div className='bg-tiles-light-blue font-open-sans-regular flex-1 flex flex-col justify-center items-center md:items-start '>
      <div className='mx-[40px] mb-[100px] mt-[60px] sm:mt-[100px] md:ml-[120px] xl:ml-[240px]'>
        <p className='font-bold text-[#254c5c]'>{t('about')}</p><br/>
        <div className='text-[#254c5c] ml-[50px] lg:leading-[35px]'>
                                        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                                          <div className='max-w-[400px]'>
                                            <p>{t('i-did')}</p><br/>
                                            <p>{t('young')}</p><br/>
                                            <p>{t('klattur')}</p><br/>
                                            Mireille Geijsen
                                           
                                          </div>
                                        </div>
                                        


                                      </div>
      </div>
    </div>
  )
}

export default AboutPage
