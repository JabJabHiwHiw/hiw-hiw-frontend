// pages/sign-up/sso-callback.js

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'

export default function SsoCallback() {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    handleRedirectCallback({}).then(() => {})
  }, [])

  return <div>Processing sign-in...</div>
}
