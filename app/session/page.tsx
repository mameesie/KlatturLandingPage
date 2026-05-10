"use client";
import BuzzMagnifier from "@/public/BuzzMagnifier";
import BuzzMagnifierMove from "@/public/BuzzMagnifierMove";
import Rewind from "@/public/Rewind";
import useLanguageStore from "@/store/useStore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const session: Session = {
  id: "Algemeene sessie",
  startStepId: "intro",
  steps: {
    intro: {
      id: "intro",
      audioFile: { nl: "", en: "" },
      options: [
        {
          label: { nl: "Ga verder", en: "Continue" },
          nextStepId: "einde",
        },
      ],
    },
    einde: {
      id: "intro",
      audioFile: { nl: "", en: "" },
      isEnd: true,
      options: [],
    },
  },
};

type AudioLanguage = {
  nl: HTMLAudioElement;
  en: HTMLAudioElement;
};

function SessionPage() {
  const [currentStep, setCurrentStep] = useState<string>(session.startStepId);
  const audioCache = useRef<Record<string, AudioLanguage>>({});
  const { language } = useLanguageStore();

  const fallbackStep = session.steps[session.startStepId];
  const currentStepData = session.steps[currentStep] ?? fallbackStep;

  useEffect(() => {
    Object.entries(session.steps).forEach(([stepKey, step]) => {
      const audio: AudioLanguage = {
        nl: new Audio(step.audioFile["nl"]),
        en: new Audio(step.audioFile["en"]),
      };
      audio["nl"].preload = "auto";
      audio["en"].preload = "auto";
      audioCache.current[stepKey] = audio;
    });
  }, []);

  function playStep(stepId: string) {
    if (!stepId) return;

    const audio = audioCache.current[stepId];
    const activeAudio = audio?.[language];

    if (!activeAudio?.src) {
      return;
    }

    activeAudio.play().catch(() => {});
  }

  function handleOptionClick(nextStepId: string) {
    if (!nextStepId) {
      return;
    }

    const nextStep = session.steps[nextStepId];

    if (!nextStep) {
      return;
    }

    setCurrentStep(nextStepId);
    playStep(nextStepId);
  }

  return (
    <div className="flex flex-col">
      <div className="flex  justify-between font-open-sans-regular text-white md:text-[18px] p-[15px]  md:px-[25px] md:pt-[40px]">
        <Link href="/" className="cursor-pointer">
          ← {language === "nl" ? "Naar startpagina" : "Back to home"}
        </Link>
        <p>{language === "nl" ? "Algemene sessie" : "General session"}</p>
      </div>
      <div className="flex flex-col items-center mt-[30px]">
        <BuzzMagnifierMove className="w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px]" />
        {!session.steps[currentStep].isEnd && (
          <button
            onClick={() => playStep(currentStep)}
            className="cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] rounded-[2000px] w-[60px] h-[60px] hover:scale-105 active:scale-100"
          >
            <Rewind />
          </button>
        )}
        {currentStepData.options.map((option, index) => {
          const isLast = index === currentStepData.options.length - 1;
          const isFirst = index === 0;

          return (
            <button
              onClick={() => {
                handleOptionClick(option.nextStepId);
              }}
              key={index}
              disabled={!option.nextStepId || !session.steps[option.nextStepId]}
              className={`cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular text-[19px] text-white flex items-center justify-center ${isFirst ? "mt-[30px]": "mt-[20px]"}  ${isLast && "mb-[80px]"} rounded-[2000px] w-[180px] h-[60px] hover:scale-105 active:scale-100`}
            >
              {option.label[language]}
            </button>
          );
        })}
          {session.steps[currentStep].isEnd && (
            <div className='md:order-2 flex justify-center items-center text-center text-[#254c5c] font-semibold font-open-sans-regular text-[18px] leading-[32px] rotate-[8deg] bg-[#99B09E] w-[250px] h-[250px] rounded-[2000px] mt-[60px] mb-[80px] md:absolute md:mt-[300px] md:mr-[430px] md:rotate-[-10deg]'>
            <p>
            {language === "nl" ? "Sessie gedaan?" : "Session done?"} <br />
            {language === "nl" ? "Vertel wat je vond" : "Tell us what you thought"}<br />
            → <a href="" className='underline cursor-pointer'>{language === "nl" ? "Feedbackformulier" : "Feedback form"}</a><br />
            {language === "nl" ? "(1 minuut)" : "(1 minute)"}
          </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default SessionPage;
