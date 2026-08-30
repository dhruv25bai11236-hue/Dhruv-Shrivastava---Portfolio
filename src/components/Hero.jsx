import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react'

// Typewriter effect for the name.
function useTypewriter(text, speed = 90) {
  const [out, setOut] = useState('')
  useEffect(() => {
    setOut('')
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return out
}

function Orbits({ mx, my }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-24 left-[8%] w-16 h-16 rounded-full bg-gradient-to-br from-white to-neutral-300 shadow-2xl animate-float"
        style={{ transform: `translate(${mx * 30}px, ${my * 30}px)` }} />
      <div className="absolute bottom-28 left-[12%] w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-neutral-400 shadow-2xl animate-float"
        style={{ animationDelay: '1.5s', transform: `translate(${mx * -40}px, ${my * 40}px)` }} />
      <div className="absolute top-1/3 right-[6%] w-10 h-10 rounded-full bg-neutral-900 shadow-2xl animate-float"
        style={{ animationDelay: '.8s', transform: `translate(${mx * 50}px, ${my * -30}px)` }} />
      <div className="absolute top-[18%] right-[22%] w-6 h-6 rounded-full bg-white/70 shadow-xl animate-float"
        style={{ animationDelay: '.4s', transform: `translate(${mx * -25}px, ${my * -45}px)` }} />
    </div>
  )
}

// Rotating "Creating Future · Building Ideas" badge — sits on the portrait.
function RotatingBadge({ className = '' }) {
  return (
    <div className={`animate-spin-slow ${className}`}>
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full glass grid place-items-center shadow-xl">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <path id="badge-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-current text-[8px] tracking-[0.22em] uppercase font-medium">
            <textPath href="#badge-circle">Creating Future · Building Ideas ·</textPath>
          </text>
        </svg>
        <ArrowRight className="-rotate-45" size={18} />
      </div>
    </div>
  )
}

export default function Hero({ profile, stats }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })   // -0.5 .. 0.5 across the section
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }
  const reset = () => setPos({ x: 0, y: 0 })

  const socials = [
    { Icon: Github, url: profile.github },
    { Icon: Linkedin, url: profile.linkedin },
    { Icon: Twitter, url: profile.twitter },
    { Icon: Instagram, url: profile.instagram },
  ]

  const fullName = `${profile.first_name} ${profile.last_name}`
  const typed = useTypewriter(fullName)

  return (
    <section
      id="home" ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      className="relative min-h-screen pt-28 overflow-hidden"
    >
      {/* cursor-following glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${(pos.x + 0.5) * 100}% ${(pos.y + 0.5) * 100}%, rgba(120,120,140,0.18), transparent 60%)`,
        }} />
      <Orbits mx={pos.x} my={pos.y} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} className="relative z-10">
          <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-2">{profile.greeting}</p>
          <h1 className="text-6xl sm:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tight min-h-[1.8em]">
            {typed}
            <span className="inline-block w-[3px] sm:w-[5px] h-[0.9em] align-middle ml-1 bg-black dark:bg-white animate-pulse" />
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <span className="text-xl font-semibold">{profile.role}</span>
            <span className="px-3 py-1 rounded-full glass text-sm">{profile.tag}</span>
          </div>
          <p className="mt-6 max-w-md text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-105 transition">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#about" className="px-6 py-3 rounded-full glass font-medium hover:scale-105 transition">About Me</a>
          </div>
          <div className="flex gap-3 mt-10">
            {socials.map(({ Icon, url }, i) => (
              <a key={i} href={url || '#'} target="_blank" rel="noreferrer"
                 className="w-11 h-11 rounded-full glass grid place-items-center hover:scale-110 hover:-translate-y-1 transition">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right column — portrait with tilt + rotating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 flex justify-center lg:justify-end">
          <div
            className="relative transition-transform duration-200 ease-out"
            style={{ transform: `perspective(900px) rotateY(${pos.x * 8}deg) rotateX(${pos.y * -8}deg)` }}
          >
            <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-tr from-white/60 to-neutral-400/40 dark:from-white/10 dark:to-white/5 rounded-full scale-110" />
            <img src={profile.photo_url || '/dhruv.jpeg'} alt={`${profile.first_name} ${profile.last_name}`}
                 className="w-[320px] sm:w-[400px] lg:w-[460px] rounded-3xl object-cover shadow-2xl" />

            {/* rotating badge — top-left over the portrait */}
            <RotatingBadge className="absolute -top-6 -left-6 sm:-left-10" />

            <div className="absolute -bottom-4 right-4 glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium max-w-[140px] leading-tight">{profile.availability}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto px-6 mt-10 lg:mt-4">
        <div className="glass rounded-3xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/40 dark:divide-white/10">
          {stats.map((s) => (
            <div key={s.id} className="px-6 py-5 text-center hover:scale-105 transition">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
