import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useResumeStore()

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return <Component {...pageProps} />
} 