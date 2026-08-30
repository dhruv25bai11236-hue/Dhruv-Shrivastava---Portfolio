import { useState, useEffect, useCallback } from 'react'
import { supabase, isConfigured } from './supabase'
import { defaultContent } from './defaultContent'

// Loads all site content. Falls back to bundled defaults (demo mode)
// when Supabase isn't configured or a fetch fails.
export function useContent() {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!isConfigured) {
      setContent(defaultContent)
      setLoading(false)
      return
    }
    try {
      const [p, s, sk, pr, ex, ce] = await Promise.all([
        supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
        supabase.from('stats').select('*').order('sort'),
        supabase.from('skills').select('*').order('sort'),
        supabase.from('projects').select('*').order('sort'),
        supabase.from('experience').select('*').order('sort'),
        supabase.from('certificates').select('*').order('sort'),
      ])
      setContent({
        profile: p.data || defaultContent.profile,
        about: p.data?.about || defaultContent.about,
        stats: s.data?.length ? s.data : defaultContent.stats,
        skills: sk.data?.length ? sk.data : defaultContent.skills,
        projects: pr.data?.length ? pr.data : defaultContent.projects,
        experience: ex.data?.length ? ex.data : defaultContent.experience,
        certificates: ce.data?.length ? ce.data : defaultContent.certificates,
      })
    } catch (e) {
      console.warn('Content load failed, using defaults:', e.message)
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { content, loading, reload: load }
}
