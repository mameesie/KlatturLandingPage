import React from 'react'

function ContactPage() {
  return (
        <div className='bg-[#8CB9BE] flex-1 flex flex-col md:flex-row justify-between md:justify-center lg:justify-start items-center md:items-start '>
          
          <div className='md:order-2 flex justify-center items-center text-center text-[#254c5c] font-semibold font-open-sans-regular text-[18px] leading-[32px] rotate-[8deg] bg-[#8CD27A] w-[250px] h-[250px] rounded-[2000px] mt-[60px] md:mt-[140px] '>
          <p>
            Sessie gedaan? <br />
            Vertel wat je vond <br />
            → <a href="" className='underline cursor-pointer'>Feedbackformulier</a><br />
            (1 minuut)
          </p>
          </div>
          <p className='md:order-1 text-white font-open-sans-regular font-semibold text-center md:text-left mx-[40px] md:ml-[0px] lg:ml-[200px] lxl:ml-[280px] md:mr-[80px] mb-[80px] md:mt-[210px]'>
            Heb je vragen of opmerkingen? <br />
            Stuur een mail naar mireille@klattur.com
          </p>
          </div>
  )
}

export default ContactPage