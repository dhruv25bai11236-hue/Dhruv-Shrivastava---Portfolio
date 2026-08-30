import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Projects, Skills, Experience, Certificates } from './components/Sections'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import { useContent } from './lib/useContent'
import { useTheme } from './lib/useTheme'
import { isConfigured } from './lib/supabase'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

// Thin progress bar showing how far down the page you are.
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', on, { passive: true })
    on()
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-1 bg-transparent">
      <div className="h-full bg-black dark:bg-white transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  )
}

// Floating "back to top" button, appears after scrolling down.
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black grid place-items-center shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default function App() {
  const route = useHashRoute()
  const { dark, toggle } = useTheme()
  const { content, loading } = useContent()

  if (route.startsWith('#/admin')) return <Admin />

  return (
    <div className="relative">
      <ScrollProgress />
      <BackToTop />
      {!isConfigured && (
        <div className="fixed bottom-4 left-4 z-50 glass rounded-full px-4 py-2 text-xs shadow-lg">
          Demo mode — connect Supabase to enable admin editing
        </div>
      )}
      <Navbar brand={content.profile.brand} dark={dark} toggleTheme={toggle} resumeUrl={content.profile.resume_url} />
      {!loading && (
        <main>
          <Hero profile={content.profile} stats={content.stats} />
          <About about={content.about} profile={content.profile} />
          <Projects projects={content.projects} />
          <Skills skills={content.skills} />
          <Experience experience={content.experience} />
          <Certificates certificates={content.certificates} />
          <Contact profile={content.profile} />
        </main>
      )}
      <Footer profile={content.profile} />
    </div>
  )
}
