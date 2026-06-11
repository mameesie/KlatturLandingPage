export type LanguageOption = {
  "nl": string;
  "en": string;
}

export type OptionNode = {
  label: LanguageOption;        // e.g. "Yes", "No", "Continue"
  nextStepId: string; 
  nextSession?: string;
  icon?: React.ComponentType<{ className?: string }>;  // ID of the next step
};

export type SessionStep = {
  id: string;
  audioFile: LanguageOption;    // path or filename, e.g. "/audio/intro.mp3"
  options: OptionNode[]; // 1 option = "Continue" button, 2+ = choice buttons
  isEnd?: boolean;      // true if this is a terminal node
};

export type Session = {
  id: string;
  startStepId: string;
  steps: Record<string, SessionStep>;
};

export type Data = {
  sessions: Record<string, Session>
}