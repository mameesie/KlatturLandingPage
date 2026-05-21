'use client'
import KlatturLogo from "@/public/KlatturLogo";
import Link from "next/link" 
import { useRouter, usePathname } from "next/navigation"
import useLanguageStore from '@/store/useStore'
import { useEffect, useRef, useState } from "react";


function Header() {
  const { language, setLanguage } = useLanguageStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOut, setIsMenuOut] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  function switchLanguage(lang: "nl" | "en") {
    setLanguage(lang)
    const newPath = pathname.replace(/^\/(nl|en)/, `/${lang}`)
    router.push(newPath)

  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOut(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={headerRef} className="flex flex-col h-[100px] bg-white sticky top-0 items-center z-20">
      
      <div className="flex items-center justify-between h-[100px] w-full">
        <Link onClick={() => setIsMenuOut(false)} href={`/${language}`} className="w-[120px] mx-[8px]"><KlatturLogo/></Link>
        <p className="font-no-name-regular text-[2.5vw] hidden xxxs:block xxs:text-[3vw] xs:text-[14px] lg:text-[16px] text-[#56710C]">
          {language === "nl" ? "Early acces versie. Help ons" : "Early access version. Help"} <br className="sm:hidden"/>
          {language === "nl" ? "bouwen" : "us build"} → <a onClick={() => setIsMenuOut(false)} className="cursor-pointer underline">{language === "nl" ? "Vertel het ons" : "Tell us"}</a>
        </p>
        <div className="flex mx-[28px]">
          {!isMenuOut && (
            <p className="font-no-name-regular text-[#56710C] mr-[28px] hidden xs2:block sm:hidden md2:block">
              <button onClick={() => switchLanguage("nl")} className={`${language === "nl" && "font-semibold"} cursor-pointer`}>NL</button>
              {" | "}
              <button onClick={() => switchLanguage("en")} className={`${language === "en" && "font-semibold"} cursor-pointer`}>EN</button>
            </p>
          )}
          <button onClick={() => setIsMenuOut(!isMenuOut)} className="font-no-name-regular text-[#56710C] cursor-pointer flex items-center justify-center">
            {isMenuOut ? <p className="p-[10px] font-bold ">X</p> : <p>MENU</p>}
          </button>
        </div>
      </div>

      {/* Animated menu */}
      <div
        className={`
          absolute top-[100px] bg-white w-full flex flex-col items-center gap-1
          overflow-hidden transition-all duration-400 ease-in-out
          ${isMenuOut ? "max-h-[300px] pb-[30px]" : "max-h-0 pb-0"}
        `}
      >
        <p className="font-no-name-regular text-[#56710C]">
          <button onClick={() => {setIsMenuOut(false); switchLanguage("nl")}} className={`${language === "nl" && "font-semibold"} cursor-pointer`}>NL</button>
          {" | "}
          <button onClick={() => {setIsMenuOut(false); switchLanguage("en")}} className={`${language === "en" && "font-semibold"} cursor-pointer`}>EN</button>
        </p>
        <Link onClick={() => setIsMenuOut(false)} className="font-open-sans-regular text-[#56710C]" href={`/${language}`}>Home</Link>
        <Link onClick={() => setIsMenuOut(false)} className="font-open-sans-regular text-[#56710C]" href={`/${language}/about`}>{language === "nl" ? "Over" : "About"}</Link>
        <Link onClick={() => setIsMenuOut(false)} className="font-open-sans-regular text-[#56710C]" href={`/${language}/contact`}>Contact</Link>
      </div>

    </div>
  );
}

export default Header;