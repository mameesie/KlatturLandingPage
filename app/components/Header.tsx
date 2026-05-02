'use client'
import KlatturLogo from "@/public/KlatturLogo";
import Link from "next/link" 
import { useRouter, usePathname } from "next/navigation"
import  useLanguageStore  from '@/store/useStore'


function Header() {
  const { language, setLanguage } = useLanguageStore()
  const router = useRouter()
  const pathname = usePathname()

function switchLanguage(lang: "nl" | "en") {
    setLanguage(lang)
    // vervang /nl/ of /en/ in de huidige URL
    const newPath = pathname.replace(/^\/(nl|en)/, `/${lang}`)
    router.push(newPath)
  }

  return (
    <div className="h-[100px] bg-white sticky top-0 flex items-center justify-between flex-shrink-0 z-20">
      
          <Link href={`/${language}`} className="w-[120px] mx-[8px]"><KlatturLogo/></Link>
          <p className="font-no-name-regular text-[2.5vw] hidden xxxs:block  xxs:text-[3vw] xs:text-[14px] lg:text-[16px] text-[#56710C]">{language === "nl" ? "Early acces versie. Help ons" : "Early access version. Help"} <br className="sm:hidden"/> {language === "nl" ? "bouwen" : "us build"} → <a className="cursor-pointer underline">{language === "nl" ? "Vertel het ons" : "Tell us"}</a></p>
          <div className="flex mx-[28px]">
            <p className="font-no-name-regular text-[#56710C] mr-[28px] hidden xs2:block sm:hidden md2:block"><button onClick={() => switchLanguage("nl")}  className={` ${language === "nl" && "font-semibold"} cursor-pointer`} >NL</button> | <button onClick={() => switchLanguage("en")} className={` ${language === "en" && "font-semibold"} cursor-pointer`}>EN</button></p>
            <button className="font-no-name-regular text-[#56710C] cursor-pointer">MENU</button>
          </div>
    </div>
     
  );
}

export default Header;
