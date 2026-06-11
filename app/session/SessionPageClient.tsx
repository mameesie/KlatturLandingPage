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
import type { Data } from "./types";
import ArrowBack from "@/public/arrowBack";
import PauseArrow from "@/public/pauseArrow";
import PlayArrow from "@/public/playArrow";

const data: Data = {
  sessions: {
    StartSessie: {
      id: "StartSessie",
      startStepId: "whatIsOnYourMind",
      steps: {
        whatIsOnYourMind: {
          id: "whatIsOnYourMind",
          audioFile: { nl: "", en: "" },
          options: [
            {
              label: { nl: "Studie of school", en: "Study or school" },
              nextStepId: "",
              icon: Book,
            },
            {
              label: { nl: "Relaties", en: "Relationships" },
              nextStepId: "",
              icon: Heart,
            },
            {
              label: { nl: "Werk of collega's", en: "Work or colleagues" },
              nextStepId: "",
              icon: Briefcase,
            },
            {
              label: { nl: "Over mijzelf", en: "About myself" },
              nextStepId: "",
              icon: Mirror,
            },
            {
              label: { nl: "Iets anders", en: "Something else" },
              nextStepId: "",
              icon: Check,
            },
            {
              label: { nl: "Ga verder", en: "Continue" },
              nextStepId: "experience",
              nextSession: "StartSessie",
            },
          ],
        },
        experience: {
          id: "experience",
          audioFile: { nl: "", en: "" },
          options: [
            {
              label: { nl: "Met voorbeelden", en: "With examples" },
              nextStepId: "1",
              nextSession: "LangeSessie",
            },
            {
              label: { nl: "Ervaren gebruiker", en: "Experienced user" },
              nextStepId: "1",
              nextSession: "KorteSessie",
            },
          ],
        },
      },
    },

    KorteSessie: {
      id: "KorteSessie",
      startStepId: "1",
      steps: {
        1: {
          id: "1",
          audioFile: { nl: "01_welkom.m4a", en: "01_welcome_back.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "2" }],
        },
        2: {
          id: "2",
          audioFile: { nl: "02_wat_is_het.m4a", en: "02_what_s_the_problem.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "3" }],
        },
        3: {
          id: "3",
          audioFile: { nl: "03_maak_de_zin.m4a", en: "03_complete_the.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "4" }],
        },
        4: {
          id: "4",
          audioFile: { nl: "04_is_het_waar.m4a", en: "04_is_it_true.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "5" }],
        },
        5: {
          id: "5",
          audioFile: { nl: "05_absoluut.m4a", en: "05_absolutely.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "6" }],
        },
        6: {
          id: "6",
          audioFile: { nl: "06_Hoe_reageer.m4a", en: "06_how_do_you.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "7" }],
        },
        7: {
          id: "7",
          audioFile: { nl: "07_wat_is_de_emotie.m4a", en: "07_what_is_the_emotion.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "8" }],
        },
        8: {
          id: "8",
          audioFile: { nl: "08_hoe_behandel_jezelf.m4a", en: "08_how_do_you_treat_yourself.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "9" }],
        },
        9: {
          id: "9",
          audioFile: { nl: "09_hoe_behandel_ander.m4a", en: "09_treat_the_other.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "10" }],
        },
        10: {
          id: "10",
          audioFile: { nl: "10_hoe_behandel_anderen.m4a", en: "10_treat_others.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "11" }],
        },
        11: {
          id: "11",
          audioFile: { nl: "11_verleden.m4a", en: "11_past.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "12" }],
        },
        12: {
          id: "12",
          audioFile: { nl: "12_toekomst.m4a", en: "12_future.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "13" }],
        },
        13: {
          id: "13",
          audioFile: { nl: "13_gedrag.m4a", en: "13_behavior.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "14" }],
        },
        14: {
          id: "14",
          audioFile: { nl: "14_stress_of_rust.m4a", en: "14_stress_or_peace.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "15" }],
        },
        15: {
          id: "15",
          audioFile: { nl: "15_zonder_de_gedachte.m4a", en: "15_who_would_you_be.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "16" }],
        },
        16: {
          id: "16",
          audioFile: { nl: "16_hoe_voelen.m4a", en: "16_how_would_you_feel.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "17" }],
        },
        17: {
          id: "17",
          audioFile: { nl: "17_wat_anders.m4a", en: "17_what_different.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "18" }],
        },
        18: {
          id: "18",
          audioFile: { nl: "18_omkering_tegenovergesteld.m4a", en: "18_turnaround_opposite.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "19" }],
        },
        19: {
          id: "19",
          audioFile: { nl: "19_omkering_ander.m4a", en: "19_turnaround_other.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "20" }],
        },
        20: {
          id: "20",
          audioFile: { nl: "20_omkering_jezelf.m4a", en: "20_turnaround_yourself.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "21" }],
        },
        21: {
          id: "21",
          audioFile: { nl: "21_afsluiting.m4a", en: "21_end.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "einde" }],
        },
        einde: {
          id: "einde",
          audioFile: { nl: "", en: "" },
          isEnd: true,
          options: [],
        },
      },
    },

    LangeSessie: {
      id: "LangeSessie",
      startStepId: "1",
      steps: {
        1: {
          id: "1",
          audioFile: { nl: "01_intro_NL.m4a", en: "01_intro_EN.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "2" }],
        },
        2: {
          id: "2",
          audioFile: { nl: "02__Ok_Dan_gaan_we.m4a", en: "02__Ok_lets_check.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "3" }],
        },
        3: {
          id: "3",
          audioFile: { nl: "03__En_wat_vind_je_het_meest.m4a", en: "03__What_bothers_you_most.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "4" }],
        },
        4: {
          id: "4",
          audioFile: { nl: "04__Dan_gaan_we_nu.m4a", en: "04__Now_were_going_to_finish_the_sentence.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "5" }],
        },
        5: {
          id: "5",
          audioFile: { nl: "05__Mooi_neem_die_zin.m4a", en: "05__Take_that_sentence.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "6" }],
        },
        6: {
          id: "6",
          audioFile: { nl: "06__Die_gedachte_gaan_we_checken.m4a", en: "06__Write_it_down.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "7" }],
        },
        7: {
          id: "7",
          audioFile: { nl: "07__Is_dit_waar.m4a", en: "07__Is_it_true.m4a" },
          options: [
            { label: { nl: "Ja", en: "Yes" }, nextStepId: "8" },
            { label: { nl: "Nee", en: "No" }, nextStepId: "9" },
          ],
        },
        8: {
          id: "8",
          audioFile: { nl: "08__Absoluut.m4a", en: "08__Absolutely.m4a" },
          options: [
            { label: { nl: "Ja", en: "Yes" }, nextStepId: "9" },
            { label: { nl: "Nee", en: "No" }, nextStepId: "9" },
          ],
        },
        9: {
          id: "9",
          audioFile: { nl: "09__Hoe_reageer_je.m4a", en: "09__What_happens.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "10" }],
        },
        10: {
          id: "10",
          audioFile: { nl: "10__Emotie_en_lijf.m4a", en: "10_Emotions_and_body.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "11" }],
        },
        11: {
          id: "11",
          audioFile: { nl: "11__Behandel_je_jezelf.m4a", en: "11_Treat_yourself.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "12" }],
        },
        12: {
          id: "12",
          audioFile: { nl: "12__Behandel_je_de_ander.m4a", en: "12_Other_person.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "13" }],
        },
        13: {
          id: "13",
          audioFile: { nl: "13__Behandel_je_anderen.m4a", en: "13_Others.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "14" }],
        },
        14: {
          id: "14",
          audioFile: { nl: "14__Beelden_verleden.m4a", en: "14_Images_past.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "15" }],
        },
        15: {
          id: "15",
          audioFile: { nl: "15__Beelden_toekomst.m4a", en: "15_Images_future.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "16" }],
        },
        16: {
          id: "16",
          audioFile: { nl: "16__Obsessies_verslavingen.m4a", en: "16_Behaviour_obsessions.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "17" }],
        },
        17: {
          id: "17",
          audioFile: { nl: "17__Stress_of_rust.m4a", en: "17_stress_or_peace_2.m4a" },
          options: [
            { label: { nl: "Stress", en: "Stress" }, nextStepId: "18" },
            { label: { nl: "Rust", en: "Peace" }, nextStepId: "18" },
          ],
        },
        18: {
          id: "18",
          audioFile: { nl: "18__Dan_gaan_we_nu_checken.m4a", en: "18_Without_the_thought.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "19" }],
        },
        19: {
          id: "19",
          audioFile: { nl: "19__Beschrijf.m4a", en: "19_what_would_be_different.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "20" }],
        },
        20: {
          id: "20",
          audioFile: { nl: "20__blijf_in_de_ruimte.m4a", en: "20_how_do_you_look.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "21" }],
        },
        21: {
          id: "21",
          audioFile: { nl: "21_Kijk_nog_eens.m4a", en: "21_And_look_at_the_sitation.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "22" }],
        },
        22: {
          id: "22",
          audioFile: { nl: "22__Eerste_omkering_tegenovergestelde.m4a", en: "22_Opposite_1_tegenovergesteld.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "23" }],
        },
        23: {
          id: "23",
          audioFile: { nl: "23__Tweede_omkering_naar_de_ander.m4a", en: "23_Second_turnaround_to_the_other.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "24" }],
        },
        24: {
          id: "24",
          audioFile: { nl: "24__Derde_omkerin_naar_jezelf.m4a", en: "24_Third_turnaround_to_yourself.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "25" }],
        },
        25: {
          id: "25",
          audioFile: { nl: "25__Afscheid_en_dank.m4a", en: "25_Thats_it_Thank.m4a" },
          options: [{ label: { nl: "Volgende", en: "Next" }, nextStepId: "einde" }],
        },
        einde: {
          id: "einde",
          audioFile: { nl: "", en: "" },
          isEnd: true,
          options: [],
        },
      },
    },
  },
};

type AudioLanguage = {
  nl: HTMLAudioElement;
  en: HTMLAudioElement;
};

// One audio folder per session per language. KorteSessie has its own
// recordings, so give it its own folders here when you add them.
const AUDIO_BASE: Record<string, Record<string, string>> = {
  LangeSessie: {
    nl: "/01_Nederlandse_algemene_meditatie",
    en: "/01_Engelse_algemene_meditatie",
  },
  KorteSessie: {
    nl: "/02_Ervaren_gebruiker_NL", // TODO: adjust to your real folder names
    en: "/02_Ervaren_gebruiker_EN",
  },
};

function getAudioUrl(sessionId: string, filename: string, lang: string): string {
  if (!filename) return "";
  const base = AUDIO_BASE[sessionId]?.[lang];
  if (!base) return "";
  return `${base}/${filename}`;
}

// Cache key must include the session, because KorteSessie and LangeSessie
// both have steps "1"–"21" with *different* audio files.
const cacheKey = (sessionId: string, stepId: string) => `${sessionId}:${stepId}`;

type HistoryEntry = { sessionId: string; stepId: string };

export default function SessionPageClient() {
  const [currentSession, setCurrentSession] = useState<string>("StartSessie");
  const [currentStep, setCurrentStep] = useState<string>(
    data.sessions["StartSessie"].startStepId
  );

  const audioCache = useRef<Record<string, Partial<AudioLanguage>>>({});
  const activeAudio = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDone, setAudioDone] = useState(false);
  const stepHistory = useRef<HistoryEntry[]>([]);
  const [canGoBack, setCanGoBack] = useState(false);

  const { language } = useLanguageStore();

  const session = data.sessions[currentSession];
  const fallbackStep = session.steps[session.startStepId];
  const currentStepData = session.steps[currentStep] ?? fallbackStep;

  const hasAudio = Boolean(currentStepData.audioFile[language]);

  // Number of real steps in the current session (everything except "einde"),
  // so the counter shows "x / 21" for KorteSessie and "x / 25" for LangeSessie.
  const totalSteps = Object.keys(session.steps).filter(
    (key) => !session.steps[key].isEnd
  ).length;

  // Preload all audio of all sessions once.
  useEffect(() => {
    Object.values(data.sessions).forEach((sess) => {
      Object.entries(sess.steps).forEach(([stepKey, step]) => {
        const nlSrc = getAudioUrl(sess.id, step.audioFile["nl"], "nl");
        const enSrc = getAudioUrl(sess.id, step.audioFile["en"], "en");
        if (!nlSrc && !enSrc) return;
        const audio: Partial<AudioLanguage> = {};
        if (nlSrc) {
          audio.nl = new Audio(nlSrc);
          audio.nl.preload = "auto";
        }
        if (enSrc) {
          audio.en = new Audio(enSrc);
          audio.en.preload = "auto";
        }
        audioCache.current[cacheKey(sess.id, stepKey)] = audio;
      });
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

  function stopActiveAudio() {
    if (activeAudio.current) {
      activeAudio.current.pause();
      activeAudio.current.currentTime = 0;
      activeAudio.current = null;
    }
    setIsPlaying(false);
  }

  function playStep(sessionId: string, stepId: string) {
    // Always stop whatever is playing and clear the highlight first,
    // even if the step we navigate to has no audio of its own.
    stopActiveAudio();
    setAudioDone(false);
    if (!stepId) return;
    const filename =
      data.sessions[sessionId]?.steps[stepId]?.audioFile[language];
    if (!filename) return;
    const track = audioCache.current[cacheKey(sessionId, stepId)]?.[language];
    if (!track) return;
    activeAudio.current = track;
    track.currentTime = 0;
    track.onended = () => {
      setIsPlaying(false);
      setAudioDone(true); // trigger highlight when finished
    };
    track
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }

  function goBack() {
    const prev = stepHistory.current.pop();
    if (!prev) return;
    setCanGoBack(stepHistory.current.length > 0);
    setCurrentSession(prev.sessionId);
    setCurrentStep(prev.stepId);
    playStep(prev.sessionId, prev.stepId);
  }

  function togglePlayPause() {
    const track = activeAudio.current;
    // Nothing has played yet → start the current step's audio.
    if (!track) {
      setAudioDone(false);
      playStep(currentSession, currentStep);
      return;
    }
    if (track.paused) {
      setAudioDone(false);
      track
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      track.pause();
      setIsPlaying(false);
    }
  }

  // Resolve which session+step an option points to. If nextSession is
  // omitted, the option stays within the current session.
  function resolveTarget(option: { nextStepId: string; nextSession?: string }) {
    if (!option.nextStepId) return null;
    const targetSessionId = option.nextSession ?? currentSession;
    const targetSession = data.sessions[targetSessionId];
    if (!targetSession) return null;
    const targetStep = targetSession.steps[option.nextStepId];
    if (!targetStep) return null;
    return { sessionId: targetSessionId, stepId: option.nextStepId };
  }

  function handleOptionClick(option: { nextStepId: string; nextSession?: string }) {
    const target = resolveTarget(option);
    if (!target) return;

    stepHistory.current.push({ sessionId: currentSession, stepId: currentStep });
    setCanGoBack(true);
    setCurrentSession(target.sessionId);
    setCurrentStep(target.stepId);
    playStep(target.sessionId, target.stepId);
  }

  const isStartScreen = currentStep === "whatIsOnYourMind";
  const isStartDecision = currentStep === "experience"
  const isEnd = Boolean(currentStepData.isEnd);

  return (
    <div className="flex flex-col">
      <div className="flex  justify-between font-open-sans-regular text-white md:text-[18px] p-[15px]  md:px-[25px] md:pt-[40px]">
        <Link href="/" className="cursor-pointer">
          ← {language === "nl" ? "Naar startpagina" : "Back to home"}
        </Link>
        <p>{language === "nl" ? "Algemene sessie" : "General session"}</p>
      </div>
      <div className="flex flex-col items-center mt-[30px]">
        {isEnd ? (
          <BuzzDone className="w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px] md:mb-[200px]" />
        ) : (
          !isStartScreen && !isStartDecision && (
            <BuzzMagnifierMove
              isPlaying={isPlaying}
              className={`w-[60vw] ml-[min(8vw,50.5px)] max-w-[380px]`}
            />
          )
        )}
        {isStartDecision && <div className="text-white font-no-name-regular max-w-[380px] w-full px-[40px] mb-[30px] ">
          
            {language === "nl" ? <p>Er zijn twee versies.</p> : <p>There are two versions.</p> }
            { language === "nl" ? <p>De eerste keer? Kies de versie met voorbeelden. Die begeleidt je stap voor stap en legt onderweg uit wat je doet.</p> : <p>First time? Choose the version with examples. It guides you through each step and  explains what you&apos;re doing along the way.</p> } <br/>
            {language === "nl" ? <p>Ken je de methode al? Dan kun je direct beginnen, zonder toelichting.</p> : <p>Already familiar with the method? You can start straight away, without the explanation.</p> }
            </div>}

        {!isEnd && !isStartScreen && (canGoBack || hasAudio) && (
          <div className="flex">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className={`${!canGoBack ? "hidden" : ""} cursor-pointer bg-[#13333E] hover:bg-[#254D5D] active:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] ${hasAudio ? "mr-[40px]" : ""} p-[16px] rounded-[2000px] w-[60px] h-[60px] hover:scale-105 active:scale-95`}
            >
              <ArrowBack className="w-full h-full" />
            </button>
            {hasAudio && (
              <>
                <button
                  onClick={togglePlayPause}
                  className="cursor-pointer bg-[#13333E] hover:bg-[#254D5D] active:bg-[#254D5D]  font-no-name-regular flex items-center justify-center mt-[20px] mr-[40px] p-[20px] rounded-[2000px] w-[60px] h-[60px] scale-130 hover:scale-135 active:scale-125"
                >
                  {isPlaying ? (
                    <PauseArrow className="w-full h-full" />
                  ) : (
                    <PlayArrow className="w-full h-full" />
                  )}
                </button>
                <button
                  onClick={() => playStep(currentSession, currentStep)}
                  className="cursor-pointer bg-[#13333E] hover:bg-[#254D5D] active:bg-[#254D5D] font-no-name-regular flex items-center justify-center mt-[20px] rounded-[2000px] w-[60px] h-[60px] hover:scale-105 active:scale-95"
                >
                  <Rewind className="w-full h-full" />
                </button>
              </>
            )}
          </div>
        )}

        {currentStepData.options.map((option, index) => {
          const isLast = index === currentStepData.options.length - 1;
          const isFirst = index === 0;
          const W = isStartScreen ? 280 : isStartDecision ? 230 : 180;
          const H = 60;
          const T = 6; // border thickness — bump this to make the rotating border wider
          const target = resolveTarget(option);

          return (
            <div
              className={`relative cursor-pointer bg-[#13333E] hover:bg-[#254D5D] active:bg-[#254D5D]  font-no-name-regular text-[19px] text-white flex items-center justify-center ${isFirst ? "mt-[40px]" : "mt-[20px]"} rounded-[2000px] ${(isStartScreen || isStartDecision) && isLast && "mb-[80px]"} ${isStartScreen ? "w-[280px]" : isStartDecision ? "w-[220px]" :  "w-[180px]"} h-[60px] ${audioDone && "animate-breathe"} hover:scale-105 active:scale-95 `}
              key={index}
            >
              <button
                className="z-10 rounded-[2000px]   flex items-center justify-center cursor-pointer"
                style={{ width: W - 2 * T, height: H - 2 * T }}
                onClick={() => handleOptionClick(option)}
                disabled={!target}
              >
                {option.icon && (
                  <option.icon className="h-[20px] max-w-[22px] translate-x-[-110px]  absolute" />
                )}
                {option.label[language]}
              </button>
            </div>
          );
        })}

        {currentSession !== "StartSessie" && !isEnd && (
          <div className="bg-[#13333E] text-white rounded-[2000px] p-[10px] mt-[40px] mb-[80px]">
            {" "}
            {currentStep} / {totalSteps}{" "}
          </div>
        )}

        {isStartScreen && (
          <div className="z-11 absolute flex justify-center w-[400px] h-[460px] rounded-[30px] bg-[#9bcc8fda] translate-y-[-30px]">
            <p className="pt-[18px] text-white font-no-name-regular text-[20px]">
              {language === "nl" ? "Kies waar je mee zit" : "Choose what's on your mind "}
            </p>
            <p
              className={`text-[#13333E] absolute rotate-[-40deg] font-open-sans-regular font-bold  ${language === "nl" ? "text-[50px] translate-y-[170px]" : "text-[80px] translate-y-[150px]"} `}
            >
              {language === "nl" ? "Binnenkort" : "Soon"}
            </p>
          </div>
        )}

        {isEnd && (
          <div className="md:order-2 flex justify-center items-center text-center text-[#254c5c] font-semibold font-open-sans-regular text-[18px] leading-[32px] rotate-[8deg] bg-[#99B09E] w-[250px] h-[250px] rounded-[2000px] mt-[60px] mb-[80px] md:absolute md:mt-[300px] md:mr-[430px] md:rotate-[-10deg]">
            <p>
              {language === "nl" ? "Sessie gedaan?" : "Session done?"} <br />
              {language === "nl" ? "Vertel wat je vond" : "Tell us what you thought"}
              <br />→{" "}
              <a
                href={`${language === "nl" ? "https://forms.gle/XHVgn981Hk4xsYzn9" : "https://forms.gle/sehAomgQQ3oXqPtx8"}`}
                className="underline cursor-pointer"
              >
                {language === "nl" ? "Feedbackformulier" : "Feedback form"}
              </a>
              <br />
              {language === "nl" ? "(1 minuut)" : "(1 minute)"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
