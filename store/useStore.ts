import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'nl'
const LANGUAGE_COOKIE = 'NEXT_LOCALE'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

const setLanguageCookie = (lang: Language) => {
  if (typeof document === 'undefined') return
  document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`
}

const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: getBrowserLanguage(),
      setLanguage: (lang) => {
        setLanguageCookie(lang)
        set({ language: lang })
      },
    }),
    {
      name: 'language-preference',
      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          setLanguageCookie(state.language)
        }
      },
    }
  )
)

export default useLanguageStore
