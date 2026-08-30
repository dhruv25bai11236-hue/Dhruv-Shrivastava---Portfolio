import { Lock } from 'lucide-react'

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <span>© {new Date().getFullYear()} {profile.first_name} {profile.last_name?.replace('.', '')}. All rights reserved.</span>
        <a href="#/admin" className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition">
          <Lock size={13} /> Admin
        </a>
      </div>
    </footer>
  )
}
