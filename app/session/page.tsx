"use client";
import BuzzMagnifier from "@/public/BuzzMagnifier";
import useLanguageStore from "@/store/useStore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const session: Session = {
  id: "Algemeene sessie",
  startStepId: "intro",
  steps: {
    "intro": {
      id: "intro",
      audioFile: { "nl": "", "en": "" },
      options: [
        {
          label: { "nl": "Ga verder", "en": "Continue" },
          nextStepId: "",
        },
      ],
    },
  },
};

type AudioLanguage = {
  "nl": HTMLAudioElement;
  "en": HTMLAudioElement;
}

function SessionPage() {
  const [currentStep, setCurentStep] = useState<string>("intro");
  const audioCache = useRef<Record<string, AudioLanguage>>({});
  const { language } = useLanguageStore()
  useEffect(() => {
    Object.values(session.steps).forEach((step) => {
      const audio : AudioLanguage = {"nl": new Audio(step.audioFile["nl"]), "en": new Audio(step.audioFile["en"])}; // CHANGE to use current language
      audio['nl'].preload = "auto";
      audio['en'].preload = "auto";
      audioCache.current[step.id] = audio;
    });
  }, []);

  // Then to play a step:
  function playStep(stepId: string) {
    const audio = audioCache.current[stepId];
    audio[language].play();
  }

  return (
    <div className="flex flex-col">
      <div className="flex  justify-between font-open-sans-regular text-white md:text-[18px] p-[15px]  md:px-[25px] md:pt-[40px]">
        <Link href="/" className="cursor-pointer">
          ← Naar startpagina
        </Link>
        <p>Algemene sessie</p>
      </div>
      <div className="flex flex-col items-center mt-[30px]">
      <BuzzMagnifier className="w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px]" />
        {session.steps[currentStep].options.map((option, index) => (
          <button
            onClick={() => {}}
            key={index}
            className=" cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular text-[19px] text-white flex items-center justify-center mt-[20px] rounded-[2000px] w-[180px] h-[60px] hover:scale-105 active:scale-100"
          >
            {option.label[language]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SessionPage;
