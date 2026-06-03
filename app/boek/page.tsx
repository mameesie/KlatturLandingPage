import type { Metadata } from "next"
import { buildPageMetadata } from "../seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Book coaching with Klattur",
  description:
    "Get in touch with Klattur to book coaching or request more information.",
  pathname: "/boek",
  
})


function BoekPage() {


  return (


    <div className='mt-[41px] text-blue text-center'>stuur een mail naar mireille@klattur.com voor meer informatie</div>
  )

}
 
export default BoekPage

