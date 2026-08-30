import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase, isConfigured } from '../lib/supabase'

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', body: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'error'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    if (!isConfigured) {
      // Demo mode — no backend. Pretend success.
      setTimeout(() => { setStatus('ok'); setForm({ name: '', email: '', body: '' }) }, 600)
      return
    }
    const { error } = await supabase.from('messages').insert({
      name: form.name, email: form.email, body: form.body,
    })
    if (error) { setStatus('error') }
    else { setStatus('ok'); setForm({ name: '', email: '', body: '' }) }
  }

  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Get in touch</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">Let's Talk</h2>
        <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 mt-4 text-neutral-600 dark:text-neutral-300 hover:underline">
          <Mail size={16} /> {profile.email}
        </a>
      </div>

      <motion.form onSubmit={submit}
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="glass rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input required placeholder="Your name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 outline-none focus:ring-2 ring-black/20 dark:ring-white/20" />
          <input required type="email" placeholder="Your email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 outline-none focus:ring-2 ring-black/20 dark:ring-white/20" />
        </div>
        <textarea required rows={5} placeholder="Your message" value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10 outline-none focus:ring-2 ring-black/20 dark:ring-white/20" />
        <button disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-105 transition disabled:opacity-50">
          {status === 'sending' ? 'Sending…' : <>Send Message <Send size={16} /></>}
        </button>
        {status === 'ok' && (
          <p className="flex items-center gap-2 text-green-600"><CheckCircle size={16} /> Thanks! Your message was sent.</p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-2 text-red-600"><AlertCircle size={16} /> Something went wrong. Please email me directly.</p>
        )}
      </motion.form>
    </section>
  )
}
