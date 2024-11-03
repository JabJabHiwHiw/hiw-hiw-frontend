'use client'
import { useEffect, useRef, useState } from 'react'
import OauthSigninButton from '../_components/OauthSigninButton'
import { useRouter } from 'next/navigation'
import { useSession } from '@clerk/nextjs'
import TestSigninButton from '../testapi/TestSigninButton'
import { cn } from '@/lib/utils'

export default function OauthSignIn() {
  const { isLoaded, session } = useSession()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoaded && !session) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isLoaded, session])

  useEffect(() => {
    if (session) {
      router.push('/getuserdata')
    }
  }, [session, router])

  if (!isLoaded || session) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-label="Loading"
      >
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  const form = () => {
    return (
      <div
        className={cn(
          'flex flex-col justify-center p-12 transition-all duration-700 lg:p-12',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="w-full flex text-5xl flex-col gap-y-2 md:flex-row md:items-center">
          <span className="font-medium">Feeling</span>
          <div className="flex w-full flex-row items-center">
            <span className="font-bold text-blue">HIWHIW</span>
            <span className="font-medium">?</span>
          </div>
        </div>
        <div className="text-2xl font-medium text-wrap">
          Manage your fridge ingredients and cook up delicious meals with what
          you have! No more wasted food—just tasty recipes ready to go!
        </div>
        <div className="flex md:w-full md:relative absolute bottom-12 left-12 right-12 md:bottom-0 md:left-0 md:right-0 items-center mt-12 flex-col gap-2">
          <div className="text-xl font-bold">Signin to your account</div>
          <OauthSigninButton
            provider="oauth_google"
            label="Sign in with Google"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row grow h-screen relative">
      <div className="flex h-full z-10 bg-primary-300 w-full lg:max-w-[600px] duration-1000 transition-all max-w-[1200px]">
        <div
          className={cn(
            'flex flex-col overflow-hidden items-center justify-center h-full w-full',
            'lg:opacity-0 opacity-100 duration-700 transition-opacity delay-200 lg:delay-0',
            'lg:pointer-events-none pointer-events-auto'
          )}
        >
          {form()}
        </div>
      </div>
      <div
        className={cn(
          'h-full w-0 overflow-hidden flex md:w-auto justify-center items-center absolute left-[600px] right-0 bottom-0',
          'transition-all duration-700 ease-in delay-0 lg:delay-200 lg:opacity-100 opacity-0',
          'pointer-events-none lg:pointer-events-auto'
        )}
      >
        {form()}
      </div>
    </div>
  )
}
