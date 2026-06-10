"use client";

import BuzzDone from "@/public/BuzzDone";
import BuzzMagnifierMove from "@/public/BuzzMagnifierMove";
import Rewind from "@/public/Rewind";
import useLanguageStore from "@/store/useStore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Heart from "@/public/icons/heart";
import Book from "@/public/icons/book";
import Briefcase from "@/public/icons/briefcase";
import Mirror from "@/public/icons/mirror";
import Check from "@/public/icons/check";
import type { Session } from "./types";
import ArrowBack from "@/public/arrowBack";
import PauseArrow from "@/public/pauseArrow";
import PlayArrow from "@/public/playArrow";

const session: Session = {
    id: "Algemeene sessie",
    startStepId: "whatIsOnYourMind",
    steps: {
        whatIsOnYourMind: {
            id: "whatIsOnYourMind",
            audioFile: { nl: "", en: "" },
            options: [{
                    label: { nl: "Studie of school", en: "Study or school" },
                    nextStepId: "",
                    icon: Book
                },
                {
                    label: { nl: "Relaties", en: "Relationships" },
                    nextStepId: "",
                    icon: Heart
                },
                {
                    label: { nl: "Werk of collega's", en: "Work or colleagues" },
                    nextStepId: "",
                    icon: Briefcase
                },
                {
                    label: { nl: "Over mijzelf", en: "About myself" },
                    nextStepId: "",
                    icon: Mirror
                },
                {
                    label: { nl: "Iets anders", en: "Something else" },
                    nextStepId: "",
                    icon: Check
                },
                {
                    label: { nl: "Ga verder", en: "Continue" },
                    nextStepId: "1",
                },
            ],
        },
        1: {
            id: "1",
            audioFile: { nl: "01_Intro.m4a", en: "01_Hi_welcome_to_klattur.m4a" },
            options: [{
                label: { nl: "Ga verder", en: "Continue" },
                nextStepId: "2",
            }, ],
        },
        2: {
            id: "2",
            audioFile: { nl: "02__Ok_Dan_gaan_we.m4a", en: "02__Ok_lets_check.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "3",
            }, ],
        },
        3: {
            id: "3",
            audioFile: { nl: "03__En_wat_vind_je_het_meest.m4a", en: "03__What_bothers_you_most.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "4",
            }, ],
        },
        4: {
            id: "4",
            audioFile: { nl: "04__Dan_gaan_we_nu.m4a", en: "04__Now_were_going_to_finish_the_sentence.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "5",
            }, ],
        },
        5: {
            id: "5",
            audioFile: { nl: "05__Mooi_neem_die_zin.m4a", en: "05__Take_that_sentence.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "6",
            }, ],
        },
        6: {
            id: "6",
            audioFile: { nl: "06__Die_gedachte_gaan_we_checken.m4a", en: "06__Write_it_down.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "7",
            }, ],
        },
        7: {
            id: "7",
            audioFile: { nl: "07__Is_dit_waar.m4a", en: "07__Is_it_true.m4a" },
            options: [{
                label: { nl: "Ja", en: "Yes" },
                nextStepId: "8",
            }, {
                label: { nl: "Nee", en: "No" },
                nextStepId: "9",
            }],
        },
        8: {
            id: "8",
            audioFile: { nl: "08__Absoluut.m4a", en: "08__Absolutely.m4a" },
            options: [{
                label: { nl: "Ja", en: "Yes" },
                nextStepId: "9",
            },{
                label: { nl: "Nee", en: "No" },
                nextStepId: "9",
            } ],
        },
        9: {
            id: "9",
            audioFile: { nl: "09__Hoe_reageer_je.m4a", en: "09__What_happens.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "10",
            }, ],
        },
        10: {
            id: "10",
            audioFile: { nl: "10__Emotie_en_lijf.m4a", en: "10_Emotions_and_body.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "11",
            }, ],
        },
        11: {
            id: "11",
            audioFile: { nl: "11__Behandel_je_jezelf.m4a", en: "11_Treat_yourself.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "12",
            }, ],
        },
        12: {
            id: "12",
            audioFile: { nl: "12__Behandel_je_de_ander.m4a", en: "12_Other_person.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "13",
            }, ],
        },
        13: {
            id: "13",
            audioFile: { nl: "13__Behandel_je_anderen.m4a", en: "13_Others.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "14",
            }, ],
        },
        14: {
            id: "14",
            audioFile: { nl: "14__Beelden_verleden.m4a", en: "14_Images_past.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "15",
            }, ],
        },
        15: {
            id: "15",
            audioFile: { nl: "15__Beelden_toekomst.m4a", en: "15_Images_future.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "16",
            }, ],
        },
        16: {
            id: "16",
            audioFile: { nl: "16__Obsessies_verslavingen.m4a", en: "16_Behaviour_obsessions.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "17",
            }, ],
        },
        17: {
            id: "17",
            audioFile: { nl: "17__Stress_of_rust.m4a", en: "17_Stress_or_peace_2.m4a" },
            options: [{
                    label: { nl: "Stress", en: "Stress" },
                    nextStepId: "18",
                },
                {
                    label: { nl: "Rust", en: "Peace" },
                    nextStepId: "18",
                },
            ],
        },
        18: {
            id: "18",
            audioFile: { nl: "18__Dan_gaan_we_nu_checken.m4a", en: "18_Without_the_thought.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "19",
            }, ],
        },
        19: {
            id: "19",
            audioFile: { nl: "19__Beschrijf.m4a", en: "19_what_would_be_different.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "20",
            }, ],
        },
        20: {
            id: "20",
            audioFile: { nl: "20__blijf_in_de_ruimte.m4a", en: "20_how_do_you_look.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "21",
            }, ],
        },
        21: {
            id: "21",
            audioFile: { nl: "21_Kijk_nog_eens.m4a", en: "21_And_look_at_the_sitation.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "22",
            }, ],
        },
        22: {
            id: "22",
            audioFile: { nl: "22__Eerste_omkering_tegenovergestelde.m4a", en: "22_Opposite_1_tegenovergesteld.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "23",
            }, ],
        },
        23: {
            id: "23",
            audioFile: { nl: "23__Tweede_omkering_naar_de_ander.m4a", en: "23_Second_turnaround_to_the_other.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "24",
            }, ],
        },
        24: {
            id: "24",
            audioFile: { nl: "24__Derde_omkerin_naar_jezelf.m4a", en: "24_Third_turnaround_to_yourself.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "25",
            }, ],
        },
        25: {
            id: "25",
            audioFile: { nl: "25__Afscheid_en_dank.m4a", en: "25_Thats_it_Thank.m4a" },
            options: [{
                label: { nl: "Volgende", en: "Next" },
                nextStepId: "einde",
            }, ],
        },
        einde: {
            id: "einde",
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

export default function SessionPageClient() {
    const [currentStep, setCurrentStep] = useState < string > (session.startStepId);
    const audioCache = useRef < Record < string,
        AudioLanguage >> ({});


    const activeAudio = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioDone, setAudioDone] = useState(false);
    const stepHistory = useRef<string[]>([]);
    const [canGoBack, setCanGoBack] = useState(false);

    const { language } = useLanguageStore();

    const fallbackStep = session.steps[session.startStepId];
    const currentStepData = session.steps[currentStep] ?? fallbackStep;


    const AUDIO_BASE: Record<string, string> = {
  nl: "/01_Nederlandse_algemene_meditatie",
  en: "/01_Engelse_algemene_meditatie",
};

    function getAudioUrl(filename: string, lang: string): string {
      if (!filename) return "";
      return `${AUDIO_BASE[lang]}/${filename}`;
    }

useEffect(() => {
  Object.entries(session.steps).forEach(([stepKey, step]) => {
    const nlSrc = getAudioUrl(step.audioFile["nl"], "nl");
    const enSrc = getAudioUrl(step.audioFile["en"], "en");
    const audio: AudioLanguage = {
      nl: new Audio(nlSrc),
      en: new Audio(enSrc),
    };
    audio.nl.preload = "auto";
    audio.en.preload = "auto";
    audioCache.current[stepKey] = audio;
  });
}, []);

  useEffect(() => {
    return () => {
      if (activeAudio.current) {
        activeAudio.current.pause();
        activeAudio.current.currentTime = 0;
        activeAudio.current = null;
      }
    };
  }, []);

function goBack() {
  const prev = stepHistory.current.pop();
  if (!prev) return;
  setCanGoBack(stepHistory.current.length > 0);
  setCurrentStep(prev);
  playStep(prev);

}

function playStep(stepId: string) {
  if (!stepId) return;
  const audio = audioCache.current[stepId];
  const track = audio?.[language];
  if (!track?.src) return;
  if (activeAudio.current) {
    activeAudio.current.pause();
    activeAudio.current.currentTime = 0;
  }
  activeAudio.current = track;
  track.currentTime = 0;
  setAudioDone(false);                 // clear highlight on (re)start
  track.onended = () => {
    setIsPlaying(false);
    setAudioDone(true);                // trigger highlight when finished
  };
  track
    .play()
    .then(() => setIsPlaying(true))
    .catch(() => setIsPlaying(false));
}

function togglePlayPause() {
  const track = activeAudio.current;
  // Nothing has played yet → start the current step's audio.
  if (!track) {
    setAudioDone(false)
    playStep(currentStep);

    return;
  }
  if (track.paused) {
    setAudioDone(false)

    track
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  } else {
    track.pause();
    setIsPlaying(false);
  }
}

    function handleOptionClick(nextStepId: string) {
        if (!nextStepId) {
            return;
        }

        const nextStep = session.steps[nextStepId];

        if (!nextStep) {
            return;
        }
        stepHistory.current.push(currentStep);
        setCanGoBack(true);    
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
        {session.steps[currentStep].isEnd ? <BuzzDone className="w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px] md:mb-[200px]"/> : !(currentStep === "whatIsOnYourMind") && <BuzzMagnifierMove isPlaying={isPlaying} className={`w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px]`} />  }
        
        {!session.steps[currentStep].isEnd && !(currentStep === "whatIsOnYourMind") && (
          

          <div className="flex">
            <button
              onClick={goBack}
              disabled={stepHistory.current.length === 0}
              className={`${!canGoBack && "hidden"} " cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] mr-[40px] p-[16px] rounded-[2000px] w-[60px] h-[60px] hover:scale-105 active:scale-100"`}
            >
              <ArrowBack />
            </button>
            <button
              onClick={togglePlayPause}
              className="cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] mr-[40px] p-[20px] rounded-[2000px] w-[60px] h-[60px] scale-130 hover:scale-135 active:scale-130"
              >
              {isPlaying ? <PauseArrow /> : <PlayArrow />}
            </button>
            <button
              onClick={() => playStep(currentStep)}
              className="cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] rounded-[2000px] w-[60px] h-[60px] hover:scale-105 active:scale-100"
            >
              <Rewind />
            </button>
          </div>
        )}
        {currentStepData.options.map((option, index) => {
          const isLast = index === currentStepData.options.length - 1;
          const isFirst = index === 0;
const W = currentStep === "whatIsOnYourMind" ? 280 : 180;
const H = 60;
const T = 6; // border thickness — bump this to make the rotating border wider

return (
  <div
    className={`relative cursor-pointer bg-[#13333E] hover:bg-[#254D5D] font-no-name-regular text-[19px] text-white flex items-center justify-center ${isFirst ? "mt-[40px]" : "mt-[20px]"} rounded-[2000px] ${currentStep === "whatIsOnYourMind" && isLast && "mb-[80px]"}  ${currentStep === "whatIsOnYourMind" ? "w-[280px]" : "w-[180px]"} h-[60px] hover:scale-105 active:scale-100`}
    key={index}
  >
    {/*de knop border animatie toch weggelaten*/}
{/*{audioDone && !(currentStep === "whatIsOnYourMind") && (
  <svg
    width={W}
    height={H}
    viewBox={`0 0 ${W} ${H}`}
    fill="none"
    className="absolute inset-0 pointer-events-none"
  >
    <rect
      x={T / 2}
      y={T / 2}
      width={W - T}
      height={H - T}
      rx={(H - T) / 2}
      stroke="#6B9BC7"
      strokeWidth={T}
      pathLength="100"
      strokeDasharray="22 78"
      className="border-comet"
    />
  </svg>
)}*/}

    <button
      className="z-10 rounded-[2000px]   flex items-center justify-center"
      style={{ width: W - 2 * T, height: H - 2 * T }}
      onClick={() => handleOptionClick(option.nextStepId)}
      key={index}
      disabled={!option.nextStepId || !session.steps[option.nextStepId]}
    >
      {option.icon && (
        <option.icon className="h-[20px] max-w-[22px] translate-x-[18px] translate-y-[5px] absolute" />
      )}
      {option.label[language]}
    </button>
  </div>
);
        })}

   {(currentStep !== "whatIsOnYourMind") && (currentStep !== "einde") && <div className="bg-[#13333E] text-white rounded-[2000px] p-[10px] mt-[40px] mb-[80px]"> {currentStep} / 25 </div>}


        {currentStep === "whatIsOnYourMind" && (
          
            <div className="z-11 absolute flex justify-center w-[400px] h-[460px] rounded-[30px] bg-[#9bcc8fda] translate-y-[-30px]">
              <p className="pt-[18px] text-white font-no-name-regular text-[20px]">{language === "nl" ? "Kies waar je mee zit" : "Choose what's on your mind "}</p>
              <p className={`text-[#13333E] absolute rotate-[-40deg] font-open-sans-regular font-bold  ${language === "nl" ? "text-[50px] translate-y-[170px]" : "text-[80px] translate-y-[150px]"} `}>{language === "nl" ? "Binnenkort" : "Soon"}</p>
            </div>
         
        )}
          {session.steps[currentStep].isEnd && (
            <div className='md:order-2 flex justify-center items-center text-center text-[#254c5c] font-semibold font-open-sans-regular text-[18px] leading-[32px] rotate-[8deg] bg-[#99B09E] w-[250px] h-[250px] rounded-[2000px] mt-[60px] mb-[80px] md:absolute md:mt-[300px] md:mr-[430px] md:rotate-[-10deg]'>
            <p>
            {language === "nl" ? "Sessie gedaan?" : "Session done?"} <br />
            {language === "nl" ? "Vertel wat je vond" : "Tell us what you thought"}<br />
            → <a href={`${language === "nl" ? "https://forms.gle/XHVgn981Hk4xsYzn9" : "https://forms.gle/sehAomgQQ3oXqPtx8"}`} className='underline cursor-pointer'>{language === "nl" ? "Feedbackformulier" : "Feedback form"}</a><br />
            {language === "nl" ? "(1 minuut)" : "(1 minute)"}
          </p>
          </div>
        )}

      </div>
    </div>
    );
}