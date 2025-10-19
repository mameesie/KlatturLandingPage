
import KlatturLogo from "@/public/KlatturLogo";
async function Header() {
  
  return (
    <div className="h-[80px] bg-white sticky top-0 flex items-center flex-shrink-0 z-20">
      <div className="flex justify-between">
          <a href="/" className="w-[100px]"><KlatturLogo/></a>
      </div>
    </div>
     
  );
}

export default Header;
