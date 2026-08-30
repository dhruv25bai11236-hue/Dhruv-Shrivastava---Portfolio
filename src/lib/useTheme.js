import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])
  return { dark, toggle: () => setDark((d) => !d) }
}
