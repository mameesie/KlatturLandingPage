import React from 'react'

function privacyPage() {
  return (
    <div className='bg-[#8CB9BE] font-open-sans-regular flex-1 flex flex-col justify-center items-center md:items-start '>
      <div className='mx-[40px] md:mx-[120px] lg:mx-[240px]'>
        <p className='font-bold text-[#254c5c]'>Privacy</p> <br/>
        <p className='text-[#254c5c] ml-[50px] md2:leading-[35px]'>Klattur respecteert je privacy.<br/><br/>
                                        <b>Welke gegevens verzamelen we?</b><br/><br/>
                                        <i>Als je feedback geeft of contact opneemt:</i><br/>
                                        - Naam en email (of anoniem)<br/>
                                        - Je bericht<br/>
                                        - We gebruiken dit om te reageren en Klattur verder te bouwen<br/><br/>
                                        <i>Cookies</i><br/>
                                        We gebruiken geen tracking cookies.<br/>
                                        Je kunt Klattur volledig anoniem gebruiken.<br/><br/>
                                        Laatst bijgewerkt: 23/05/2026<br/></p>
      </div>
    </div>
  )
}

export default privacyPage