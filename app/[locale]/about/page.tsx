import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
const t  = await getTranslations("about")
  return {
    title: t('meta-title'),
    description: t('meta-description'),
    alternates: {
      canonical: `https://klattur.com/${params.locale}/about`,
      languages: {
        'en': 'https://klattur.com/en/about',
        'nl': 'https://klattur.com/nl/about',
      },
    },
    openGraph: {
      title: t('meta-title'),
      description: t('meta-description'),
      url: `https://klattur.com/${params.locale}/about`,
    },
  }
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