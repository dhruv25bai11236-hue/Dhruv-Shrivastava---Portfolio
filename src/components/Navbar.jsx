import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const LINKS = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Certificates', 'Contact']

export default function Navbar({ brand, dark, toggleTheme, resumeUrl }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      // hide when scrolling down (past a small threshold), show when scrolling up
      if (y > lastY && y > 80) setHidden(true)
      else setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#home" className="text-2xl font-extrabold tracking-tight">{brand || 'DS.'}</a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="group relative text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
                {l}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-current group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full glass grid place-items-center hover:scale-105 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={resumeUrl || '#'} target="_blank" rel="noreferrer"
             className="hidden sm:inline-flex px-4 py-2 rounded-full glass text-sm font-medium hover:scale-105 transition">
            Resume
          </a>
          <a href="#contact"
             className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:scale-105 transition">
            Let's Talk
          </a>
        </div>
      </nav>
    </header>
  )
}
