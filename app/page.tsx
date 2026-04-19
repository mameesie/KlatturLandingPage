"use client";
import MoodPeopleGlasses from "@/public/MoodPeopleGlasses";
import React from "react";
import VimeoAnimation from "./components/VimeoAnimation";
import BuzzMagnifier from "@/public/BuzzMagnifier";

function page() {
  return (
    <div className=" ">
      <p className=" text-[6vw] md:text-[4vw] mt-[10vw] md:mt-[7vw] lg:mt-[4.5vw] text-center text-white font-no-name-regular">
        Minder mind clutter,<br className="md:hidden" />  meer rust in je hoofd
      </p>
      <p className=" text-[3vw] md:text-[2.1vw] mb-[7vw] md:mb-[5.5vw] lg:mb-[2.8vw] lg:mt-[-1vw] text-center text-white font-open-sans-regular">
        Tien minuten. Eén gedachten
      </p>
      <div className="mx-[8vw] lg:w-[850px] lg:mx-auto lg:flex lg:justify-center">
        <div className="w-full aspect-video">
          <VimeoAnimation />
        </div>
      </div>
      {/* <button ></button> */}
      <div className="flex justify-center">
        <a href="/sessie" className="bg-[#9ACC8F] font-no-name-regular text-[#56710C] flex items-center justify-center rounded-[2000px] w-[50vw] lg:w-[450px] h-[12.5vw] lg:h-[112.5px]  text-[4vw] lg:text-[36px] mt-[7vw] lg:mt-[57px]">
          Probeer het zelf
        </a>
      </div>
      <div className="bg-[#56710C] rounded-[8vw] md:rounded-[72.8px] mx-[8vw] lxl:w-[1215px] lxl:mx-auto lxl:flex lxl:justify-center mt-[7vw] lg:mt-[57px]">
        <div className="w-full flex justify-between items-center ">
          <div className="ml-[8vw] sm:ml-[4vw]  my-[8vw] sm:my-[4vw] ">
            <BuzzMagnifier className="w-[100px] sm:w-[16.5vw] xl:w-[210px] "/>
          </div>
          <p className="font-open-sans-regular text-white mr-[8vw] sm:mr-[5.36vw] my-[8vw] sm:my-[3vw] ml-[5.36vw] sm:ml-[4vw] text-[16px] sm:text-[2.5vw] xl:text-[34px]">Klattur helpt je je gedachten te checken en te ontdekken wat die met je doen. Wetenschappelijk onderbouwd.</p>
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

export default page;
