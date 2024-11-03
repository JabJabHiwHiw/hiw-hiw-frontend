'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    <button
      className="hover:underline text-indigo-800 hover:text-indigo-700"
      onClick={() => signOut({ redirectUrl: '/' })}
    >
      Sign out
    </button>
  )
}
