type LanguageOption = {
  "nl": string;
  "en": string;
}

type OptionNode = {
  label: LanguageOption;        // e.g. "Yes", "No", "Continue"
  nextStepId: string;   // ID of the next step
};

type SessionStep = {
  id: string;
  audioFile: LanguageOption;    // path or filename, e.g. "/audio/intro.mp3"
  options: OptionNode[]; // 1 option = "Continue" button, 2+ = choice buttons
  isEnd?: boolean;      // true if this is a terminal node
};

type Session = {
  id: string;
  startStepId: string;
  steps: Record<string, SessionStep>;
};