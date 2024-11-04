'use client'
import { useUser, useSession } from '@clerk/nextjs'
import { SignOutButton } from '../_components/SignOutButton'
import { useEffect } from 'react'

export default function Test() {
  const { isLoaded: isUserLoaded, user } = useUser()
  const { isLoaded: isSessionLoaded, session } = useSession()

  useEffect(() => {
    if (!user) return
    console.log('User:', user)
  }, [user])

  useEffect(() => {
    if (!session) return
    console.log('Session:', session)
  }, [session])

  if (!isUserLoaded || !isSessionLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a
            className="inline-block underline -translate-y-0 hover:-translate-y-0.5 text-indigo-700 hover:text-indigo-600 active:text-indigo-800 transition-all"
            href="/discover"
          >
            HiwHiw
          </a>
        </h1>
        {session && user ? (
          <div>
            <p className="mt-3 text-2xl">
              You are signed in as {user.fullName}
            </p>

            <p className="mt-3 text-2xl">Your ID is {user.id}</p>

            <p className="mt-3 text-2xl">Your session is {session.id}</p>

            <p className="mt-3 text-2xl">Other Object in console</p>
          </div>
        ) : (
          <p className="mt-3 text-2xl">You are not signed in</p>
        )}
      </div>
      <SignOutButton />
    </div>
  )
}
