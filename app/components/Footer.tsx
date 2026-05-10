'use client'
import React from 'react'
import Link from "next/link" 

function Footer() {
  return (
    <div className='shrink-0 mt-auto bg-[#254c5c] text-white font-no-name-regular flex flex-col text-center justify-center leading-[30px] text-[14px] h-[160px]' >
      <p>Gebaseerd op The Work© van Byron Katie | <a href="https://www.thework.com" className='underline'>thework.com</a></p>
      <p className='text-[18px]'> <Link href="/privacy">Privacy</Link> | <Link href="/credits">Credits</Link> | <Link href="/contact">Contact</Link></p>
      <p className='font-open-sans-regular'>© {new Date().getFullYear()} Klattur</p>
    </div>
  )
}

export default Footer