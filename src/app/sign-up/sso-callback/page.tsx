'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SsoCallback() {
  const router = useRouter()

  useEffect(() => {
    router.push('/discover')
  }, [])

  return <div>Processing sign-in...</div>
}
