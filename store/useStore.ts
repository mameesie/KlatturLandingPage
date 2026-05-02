import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'nl'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getBrowserLanguage(),
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'language-preference' }
  )
)

export default useLanguageStore