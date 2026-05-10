import { getTranslations } from 'next-intl/server'
import React from 'react'

async function privacyPage() {
  const t  = await getTranslations("credits")
  return (
    <div className='bg-[#8CB9BE] font-open-sans-regular flex-1 flex flex-col justify-center items-center md:items-start '>
      <div className='mx-[40px] md:ml-[120px] xl:ml-[240px]'>
        <p className='font-bold text-[#254c5c]'>Credits & Copyright</p> <br/>
        <div className='text-[#254c5c] ml-[50px] lg:leading-[35px]'>
                                        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                                          <div className='max-w-[400px]'>
                                            <b>{t('byron')}</b><br/>
                                            {t('thought')}<br/><br/>
                                            {t('theWork')}<br/><br/>
                                            {t('info')}<br/>
                                            → <a className='underline cursor-pointer' href="https://www.thework.com">thework.com</a><br/><br/>
                                          
                                          </div>
                                          <div className='lg:ml-[80px] xl:ml-[120px] max-w-[400px]'>
                                            <b>Klattur©</b> <br />
                                            {t('developed')}<br />
                                            Mireille Geijsen Ontwerper Bv | 2025<br /><br />
                                            {t('official')} <br /> <br />
                                            Copyright © {new Date().getFullYear()} Klattur
                                          </div>
                                        </div>
                                        


                                      </div>
      </div>
    </div>
  )
}

export default privacyPage