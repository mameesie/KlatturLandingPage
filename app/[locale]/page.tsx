import VimeoAnimation from "../components/VimeoAnimation";
import BuzzMagnifier from "@/public/BuzzMagnifier";
import ScienceGroup from "@/public/ScienceGroup";
import StudyMan from "@/public/StudyMan";
import WaarZitJeMeeCard from "../components/WaarZitJeMeeCard";
import HeartMan from "@/public/HeartMan";
import WorkMan from "@/public/WorkMan";
import SomethingElseMan from "@/public/SomthingElseMan";
import YourselfMan from "@/public/YourselfMan";
import { Link } from "@/i18n/routing"
import { getTranslations } from 'next-intl/server'

async function  MainPage() {
  const t  = await getTranslations("landing")
  return (
    <div className=" ">
      <p className="text-[max(6vw,28px)] lxl:text-[57px] md:text-[4vw] mt-[max(11.2vw,47px)] md:mt-[6.5vw] lxl:mt-[90px] leading-[max(7.9vw,35px)] md:leading-normal text-center text-white font-no-name-regular">
        {t('title1')}
        <br className="md:hidden" /> {t('title2')}
      </p>
      <p className=" text-[max(3.2vw,16px)] md:text-[2.1vw] lxl:text-[29px] mb-[max(7vw,28.5px)] md:mb-[4vw] lxl:mb-[55px] mt-[max(2.6vw,9px)] md:mt-[-.5vw] lxl:mt-[-6.9px] text-center text-white font-open-sans-regular">
        {t('subtitle')}
      </p>
      <div className="mx-[8vw] vimeo:w-[750px] vimeo:mx-auto vimeo:flex vimeo:justify-center">
        <div className="w-full aspect-video">
          <VimeoAnimation />
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/start"
          className="bg-[#9ACC8F] hover:bg-[#aad2a2] font-no-name-regular text-[#56710C] flex items-center justify-center rounded-[2000px] w-[50vw] min-w-[200px] max-w-[280px] h-[12.5vw] min-h-[50px] max-h-[75px]  text-[min(max(4vw,16px),24px)]  my-[max(7.7vw,31px)] vimeo:my-[57px] hover:scale-105 active:scale-100"
        >
          {t('button1')}
        </Link>
      </div>

      <div className="bg-[#56710C] rounded-[35px] mx-[8vw] lxl:w-[1110px] lxl:mx-auto lxl:flex lxl:justify-center">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center ">
          <div className="sm:ml-[65px] mt-[50px] sm:mt-[39px] sm:mb-[32px]">
            <BuzzMagnifier className="w-[85px] sm:w-[120px] " />
          </div>
          <div className="mt-[12px] mb-[45px] sm:my-[45px] ">
            <p className="font-no-name-regular  text-white  mx-[40px] sm:mx-[51px] text-[20px] sm:text-[23px]  ">
              {t('howItWorks')}
            </p>
            <p className="font-open-sans-regular text-white mx-[40px] sm:mx-[51px] text-[16px] leading-[26px] sm:leading-[29px]  ">
              {t('howItWorksText')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#56710C] rounded-[35px] mt-[80px] mx-[8vw] lxl:w-[1110px] lxl:mx-auto lxl:flex lxl:justify-center">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center ">
          <div className="sm:ml-[65px] mt-[50px] sm:mt-[39px] sm:mb-[32px]">
            <ScienceGroup className="w-[100px] sm:w-[120px] mb-[9px] sm:mb-[0px] " />
          </div>
          <div className="mt-[12px] mb-[45px] sm:my-[45px]">
            <p className="font-no-name-regular text-white  mx-[40px] sm:mx-[51px] text-[20px] sm:text-[23px]  ">
              {t('scienceBacked')}
            </p>
            <p className="font-open-sans-regular text-white mx-[40px] sm:mx-[51px] text-[16px] leading-[26px] sm:leading-[29px]  ">
              {t('scienceBackedText')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#99CC8F] rounded-[35px] mt-[80px] mx-[8vw] lxl:w-[1110px] lxl:mx-auto flex flex-col lxl:justify-center mb-[80px]">
        <p className="font-no-name-regular text-center text-[#56710C] text-[25px] sm:text-[23px] pt-[38px] pb-[20px] ">
          {t('whatIsOnYourMind')}
        </p>
        <div className="w-full ">
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={StudyMan}
              title={t('study')}
              description={t('studyText')}
            />
            <WaarZitJeMeeCard
              className="lg:ml-[40px]"
              illustration={HeartMan}
              title={t('relations')}
              description={t('relationsText')}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={WorkMan}
              title={t('work')}
              description={t('workText')}
            />
            <WaarZitJeMeeCard
              className="lg:ml-[40px]"
              illustration={YourselfMan}
              title={t('yourSelf')}
              description={t('yourSelfText')}
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={SomethingElseMan}
              title={t('somethingElse')}
              description={t('somethingElseText')}
            />
            <div className="flex justify-center">
              <p className="text-white font-open-sans-regular mx-[40px] text-center lg:text-left  sm:w-[460px] lg:w-[360px] lg:ml-[40px] lg:mr-[0px] lg:flex lg:items-center">
                {t('extraText')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <Link
            className="flex justify-center items-center bg-[#13333E] rounded-[2000px] w-[160px] h-[50px] mt-[25px] mb-[60px] text-white font-no-name-regular cursor-pointer hover:scale-105 hover:bg-[#254D5D] active:scale-100"
            href="/start"
          >
            {t('button2')}
          </Link>
        </div>
      </div>
    </div>

    // <div className="flex justify-evenly">
    //   <div className="flex items-center w-[50%]">
    //     <MoodPeopleGlasses />
    //   </div>
    //   <div className="flex flex-col  w-[50%] justify-center items-start">
    //     <div className="flex flex-col items-center ml-[10px] mb-[11px] sm:mb-[14px] sm:ml-[18px] md:mb-[20px] md:ml-[30px] lg:mb-[30px] lg:ml-[40px] xl:mb-[38px] xl:ml-[50px]">
    //       <h1 className="font-no-name-regular text-blue text-[18px] py-[8px] xs:text-[28px] leading-tight sm:text-[38px] md:text-[48px] md:py-[14px] lg:text-[64px] xl:text-[83px] xl:py-[22px]">
    //         Clear your <br /> mind clutter <br /> and get rest
    //       </h1>
    //       <a href="/boek" className="bg-logo font-open-sans-semibold text-dark-blue text-center text-[14px] rounded-[2000px] w-[150px] py-[4px] px-[15px] md:text-[20px] md:w-[200px]  xl:text-[30px] xl:w-[320px]">
    //         Boek een coach
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
}

export default MainPage;
