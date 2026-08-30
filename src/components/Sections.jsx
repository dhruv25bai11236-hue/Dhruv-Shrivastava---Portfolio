import { motion } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

function Heading({ kicker, title }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">{kicker}</p>
      <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">{title}</h2>
    </div>
  )
}

export function About({ about, profile }) {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-16">
      <motion.div {...fade}>
        <Heading kicker="Who I am" title="About Me" />
        <p className="text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 text-center max-w-3xl mx-auto">
          {about}
        </p>
      </motion.div>
    </section>
  )
}

export function Projects({ projects }) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <Heading kicker="My Work" title="Featured Projects" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.a key={p.id} href={p.link || '#'} target="_blank" rel="noreferrer"
            {...fade} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/30 overflow-hidden">
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-black/[0.03] to-transparent dark:from-white/[0.06]" />
            <div className="relative flex items-start justify-between">
              <h3 className="text-xl font-bold group-hover:translate-x-0.5 transition-transform">{p.title}</h3>
              <ExternalLink size={18} className="opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition" />
            </div>
            <p className="relative mt-3 text-neutral-600 dark:text-neutral-300">{p.desc}</p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {(p.tags || '').split(',').filter(Boolean).map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/20 transition">{t.trim()}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export function Skills({ skills }) {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
      <Heading kicker="What I use" title="Skills" />
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
        {skills.map((s, i) => (
          <motion.div key={s.id} {...fade} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>{s.name}</span><span className="text-neutral-500">{s.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
                className="h-full rounded-full bg-black dark:bg-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Experience({ experience }) {
  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-16">
      <Heading kicker="My journey" title="Experience" />
      <div className="relative border-l border-black/15 dark:border-white/15 pl-8 space-y-10">
        {experience.map((e) => (
          <motion.div key={e.id} {...fade} className="relative">
            <span className="absolute -left-[38px] top-1.5 w-3.5 h-3.5 rounded-full bg-black dark:bg-white ring-4 ring-[#e9eaec] dark:ring-[#0c0c0e]" />
            <div className="text-sm text-neutral-500">{e.period}</div>
            <h3 className="text-xl font-bold mt-1">{e.role}</h3>
            <div className="text-neutral-600 dark:text-neutral-300">{e.org}</div>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{e.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Certificates({ certificates }) {
  return (
    <section id="certificates" className="max-w-5xl mx-auto px-6 py-16">
      <Heading kicker="Proof of work" title="Certificates & Achievements" />
      <div className="grid sm:grid-cols-2 gap-5">
        {certificates.map((c, i) => (
          <motion.div key={c.id} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-black/20 dark:hover:border-white/30">
            {c.image_url && (
              <a href={c.link || c.image_url} target="_blank" rel="noreferrer" className="block overflow-hidden">
                <img src={c.image_url} alt={c.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
              </a>
            )}
            <div className="p-5 flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black grid place-items-center group-hover:rotate-6 group-hover:scale-110 transition-transform">
                <Award size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold truncate">{c.title}</h3>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noreferrer" aria-label="View credential">
                      <ExternalLink size={15} className="opacity-40 group-hover:opacity-100 transition" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">
                  {c.issuer}{c.issuer && c.year ? ' · ' : ''}{c.year}
                </p>
                {c.desc && <p className="text-sm text-neutral-500 mt-1">{c.desc}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
