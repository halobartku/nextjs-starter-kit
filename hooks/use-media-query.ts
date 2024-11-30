import { useCallback, useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const getMatches = useCallback((query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }, [])

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query))
    }

    const matchMedia = window.matchMedia(query)

    // Initial check
    handleChange()

    // Listen for changes
    matchMedia.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query, getMatches])

  return matches
}
