'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'

export default function SsoCallback() {
  const router = useRouter()
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    // handleRedirectCallback({}).then(() => {
    router.push('/getuserdata')
    // })
  }, [])

  return <div>Processing sign-in...</div>
}
