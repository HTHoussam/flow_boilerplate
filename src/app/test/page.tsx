'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && <div>content here</div>
}
