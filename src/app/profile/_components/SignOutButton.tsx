'use client'

import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('userId')

      await signOut({ redirectUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button variant={'outline'} className="w-full" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
