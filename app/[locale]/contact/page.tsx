import { getTranslations } from 'next-intl/server'
import React from 'react'

async function ContactPage() {
  const t  = await getTranslations("contact")

  return (
        <div className='bg-[#8CB9BE] flex-1 flex flex-col md:flex-row justify-between md:justify-center lg:justify-start items-center md:items-start '>
          
          <div className='md:order-2 flex justify-center items-center text-center text-[#254c5c] font-semibold font-open-sans-regular text-[18px] leading-[32px] rotate-[8deg] bg-[#8CD27A] w-[250px] h-[250px] rounded-[2000px] mt-[60px] md:mt-[140px] '>
          <p>
            {t('session')} <br />
            {t('tellUs')}<br />
            → <a href="" className='underline cursor-pointer'>{t('feedback')}</a><br />
            {t('minute')}
          </p>
          </div>
          <p className='md:order-1 text-white font-open-sans-regular font-semibold text-center md:text-left mx-[40px] md:ml-[0px] lg:ml-[200px] lxl:ml-[280px] md:mr-[80px] mb-[80px] md:mt-[210px]'>
            {t('questions')} <br />
            {t('email')}
          </p>
          </div>
  )
}

export default ContactPage