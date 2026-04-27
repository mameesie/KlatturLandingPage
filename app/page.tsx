"use client";
import MoodPeopleGlasses from "@/public/MoodPeopleGlasses";
import React, { useEffect } from "react";
import VimeoAnimation from "./components/VimeoAnimation";
import BuzzMagnifier from "@/public/BuzzMagnifier";
import ScienceGroup from "@/public/ScienceGroup";
import StudyMan from "@/public/StudyMan";
import WaarZitJeMeeCard from "./components/WaarZitJeMeeCard";
import HeartMan from "@/public/HeartMan";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import WorkMan from "@/public/WorkMan";
import SomethingElseMan from "@/public/SomthingElseMan";
import YourselfMan from "@/public/YourselfMan";

function MainPage() {
  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    const tl = gsap.timeline({
      repeat: -1,
    });
    const cm = gsap.timeline({
      repeat: -1,
    });

    // heartMan
    tl.to("#heart", {
      duration: 0.8,

      scale: 0.075,
      repeat: 0,
      transformOrigin: "center center ",
    })

      .to("#heart", {
        duration: 0.8,

        scale: 0.06,
        repeat: 0,
        transformOrigin: "center center ",
      })
      .add(gsap.delayedCall(0.3, () => {}))
      // shrink
      .to("#heart", {
        duration: 1.0,
        scale: 0.001,
        transformOrigin: "bottom center ",
      })
      .add(gsap.delayedCall(0.6, () => {}))

      .to("#heart", {
        // IMPORTANT: this must exist as original path state
        scale: 0.06,
        duration: 0.8,
        transformOrigin: "bottom center ",
      });
    // WorkMan
    gsap.to("#workman-briefcase", {
      rotation: 10,
      transformOrigin: "0% 0%",
      duration: 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to("#mirror", {
      rotation: 10,
      transformOrigin: "0% 100%",
      duration: 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // SOmethingElseMan
    cm.add(gsap.delayedCall(0.2, () => {}))
      .to("#CheckCover", {
        duration: 0.75,
        morphSVG: "M67 110h6v36H67z",
      })
      .to("#checkMark", {
        duration: 0.75,

        scale: 0.075,
        repeat: 0,
        transformOrigin: "center center ",
      })
      .to("#checkMark", {
        duration: 0.75,

        scale: 0.058,
        repeat: 0,
        transformOrigin: "center center ",
      })
      .add(gsap.delayedCall(0.6, () => {}))
      .to("#CheckCover", {
        duration: 0.75,
        morphSVG: "M26 110h47v36H26z",
      });
  }, []);
  return (
    <div className=" ">
      <p className="text-[max(6vw,28px)] lxl:text-[57px] md:text-[4vw] mt-[max(11.2vw,47px)] md:mt-[6.5vw] lxl:mt-[90px] leading-[max(7.9vw,35px)] md:leading-normal text-center text-white font-no-name-regular">
        Minder mind clutter,
        <br className="md:hidden" /> meer rust in je hoofd
      </p>
      <p className=" text-[max(3.2vw,16px)] md:text-[2.1vw] lxl:text-[29px] mb-[max(7vw,28.5px)] md:mb-[4vw] lxl:mb-[55px] mt-[max(2.6vw,9px)] md:mt-[-.5vw] lxl:mt-[-6.9px] text-center text-white font-open-sans-regular">
        Tien minuten. Eén gedachte
      </p>
      <div className="mx-[8vw] vimeo:w-[750px] vimeo:mx-auto vimeo:flex vimeo:justify-center">
        <div className="w-full aspect-video">
          <VimeoAnimation />
        </div>
      </div>

      <div className="flex justify-center">
        <a
          href="/sessie"
          className="bg-[#9ACC8F] font-no-name-regular text-[#56710C] flex items-center justify-center rounded-[2000px] w-[50vw] min-w-[200px] max-w-[280px] h-[12.5vw] min-h-[50px] max-h-[75px]  text-[min(max(4vw,16px),24px)]  my-[max(7.7vw,31px)] vimeo:my-[57px] hover:scale-105 active:scale-100"
        >
          Probeer het zelf
        </a>
      </div>

      <div className="bg-[#56710C] rounded-[35px] mx-[8vw] lxl:w-[1110px] lxl:mx-auto lxl:flex lxl:justify-center">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center ">
          <div className="sm:ml-[65px] mt-[50px] sm:mt-[39px] sm:mb-[32px]">
            <BuzzMagnifier className="w-[85px] sm:w-[120px] " />
          </div>
          <div className="mt-[12px] mb-[45px] sm:my-[45px] ">
            <p className="font-no-name-regular  font-semibold text-white  mx-[40px] sm:mx-[51px] text-[20px] sm:text-[23px]  ">
              Hoe werkt het?
            </p>
            <p className="font-open-sans-regular text-white mx-[40px] sm:mx-[51px] text-[16px] leading-[26px] sm:leading-[29px]  ">
              Neem een gedachte die je dwars zit. Klattur bevraagt deze gedachte
              stap voor stap, met audio, in je eigen tempo. Je onderzoekt wat
              die gedachte met je doet. En vooral, wat er overblijft als je hem
              checkt.
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
            <p className="font-no-name-regular font-semibold text-white  mx-[40px] sm:mx-[51px] text-[20px] sm:text-[23px]  ">
              Wetenschappelijk onderbouwd
            </p>
            <p className="font-open-sans-regular text-white mx-[40px] sm:mx-[51px] text-[16px] leading-[26px] sm:leading-[29px]  ">
              Uit klinisch onderzoek onder bijna 200 deelnemers bleek dat mensen
              na het werken met deze aanpak zich significant minder angstig,
              somberder en bozer voelen en dat dit effect zes maanden later nog
              steeds meetbaar was. In een tweede studie met controlegroep namen
              burn-outklachten significant af bij de groep die de methode
              volgde. Kort gezegd: het werkt. En veel mensen merken al na één
              sessie verschil.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#99CC8F] rounded-[35px] mt-[80px] mx-[8vw] lxl:w-[1110px] lxl:mx-auto flex flex-col lxl:justify-center mb-[80px]">
        <p className="font-no-name-regular text-center text-[#56710C] text-[25px] sm:text-[23px] pt-[38px] pb-[20px] ">
          Waar zit jij mee?
        </p>
        <div className="w-full ">
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={StudyMan}
              title="Studie en school"
              description="Stress over een toets, een opdracht of het gevoel dat je het allemaal niet kan bijbenen."
            />
            <WaarZitJeMeeCard
              className="lg:ml-[40px]"
              illustration={HeartMan}
              title="Relaties"
              description="Iets wat je dwarszit over je partner, een vriend, je ouders of een ex."
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={WorkMan}
              title="Werk of collega's"
              description="Een gedachte over je leidinggevende, een collega of hoe je functioneert."
            />
            <WaarZitJeMeeCard
              className="lg:ml-[40px]"
              illustration={YourselfMan}
              title="Over mijzelf"
              description="Een overtuiging over wie je bent, hoe je eruitziet of wat je wel of niet kan."
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-center">
            <WaarZitJeMeeCard
              illustration={SomethingElseMan}
              title="Iets anders"
              description="Zit je ergens mee dat hier niet tussen past? Begin gewoon."
            />
            <div className="flex justify-center">
              <p className="text-white mx-[40px] text-center lg:text-left  sm:w-[460px] lg:w-[360px] lg:ml-[40px] lg:mr-[0px] lg:flex lg:items-center">
                Kies wat er nu speelt. Doe een sessie. En kijk wat er daarna nog
                over is van die gedachte.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <a
            className="flex justify-center items-center bg-[#13333E] rounded-[2000px] w-[160px] h-[50px] mt-[25px] mb-[60px] text-white font-no-name-regular cursor-pointer hover:scale-105 active:scale-100"
            href="/sessie"
          >
            Probeer nu
          </a>
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
