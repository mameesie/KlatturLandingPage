
import KlatturLogo from "@/public/KlatturLogo";
import Link from "next/link";
async function Header() {
  
  return (
    <div className="h-[80px] bg-white sticky top-0 flex items-center flex-shrink-0 z-20">
      <div className="flex justify-between">
          <Link href="/" className="w-[100px]"><KlatturLogo/></Link>
      </div>
    </div>
     
  );
}

export default Header;
