// pages/sign-up/sso-callback.js

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'

export default function SsoCallback() {
  const router = useRouter()
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    handleRedirectCallback({}).then(() => {})
  }, [])

  return <div>Processing sign-in...</div>
}
