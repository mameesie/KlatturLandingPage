
import React from 'react'
import {Link} from "@/i18n/routing"
function StartPage() {

  return (
    <div className='flex flex-col'>
      <div className='flex  justify-between font-open-sans-regular text-white md:text-[18px] p-[15px]  md:px-[25px] md:pt-[40px]'>
        <Link href='/' className='cursor-pointer' >← Naar startpagina</Link>
        <p>Algemene sessie</p>
      </div>
      <div className='flex flex-col items-center mt-[60px]'>
        <p className='mx-[80px] max-w-[405px] font-open-sans-regular text-white'>
          Zet je geluid aan. <br /><br />
          Neem je tijd. Schriff je antwoorden op of onthoud
          ze, wat voor jou werkt. En terwijl je luistert en
          antwoord geeft: voel ook wat er gebeurt. Soms
          zegt je lichaam meer dan je hoofd.

        </p>
        <Link href='/session'
          
          className=" cursor-pointer bg-[#9ACC8F] hover:bg-[#aad2a2] font-no-name-regular text-[19px] text-[#56710C] flex items-center justify-center mt-[70px] rounded-[2000px] w-[180px] h-[60px] hover:scale-105 active:scale-100"
        >
          Speel nu af
        </Link>
      </div>

    </div>
  )
}

export default StartPage