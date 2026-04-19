
import KlatturLogo from "@/public/KlatturLogo";
import Link from "next/link";
async function Header() {
  
  return (
    <div className="h-[100px] bg-white sticky top-0 flex items-center justify-between flex-shrink-0 z-20">
      
          <Link href="/" className="w-[120px] mx-[8px]"><KlatturLogo/></Link>
          <p className="font-no-name-regular text-[2.5vw] hidden xxxs:block  xxs:text-[3vw] xs:text-[14px] text-[#56710C]">Early acces versie. Help ons <br className="sm:hidden"/> bouwen → <a className="cursor-pointer underline">Vertel het ons</a></p>
          <p className="font-no-name-regular text-[#56710C] mx-[28px]">MENU</p>
    </div>
     
  );
}

export default Header;
