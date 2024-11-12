'use client'
import { useUser, useSession } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/components/navigation'

export default function Test() {
  const router = useRouter()
  const { isLoaded: isUserLoaded, user } = useUser()
  const { isLoaded: isSessionLoaded, session } = useSession()

  useEffect(() => {
    if (!user) return
    console.log('User:', user)
  }, [user])

  useEffect(() => {
    if (!session) return
    console.log('Session:', session)
    if (isSessionLoaded && isUserLoaded && session && user) {
      // const handleStore = async () => {
      //   const rsp = await registerAuthApi(
      //     user.fullName,
      //     user.emailAddresses[0].emailAddress,
      //     user.id,
      //     user.imageUrl
      //   )
      //   if (rsp && rsp.user_id) {
      //     localStorage.setItem('userId', rsp.user_id)
      //   } else {
      //     console.error('Failed to register user or retrieve user_id')
      //   }
      // }
      // handleStore()
      router.push('/discover')
    }
  }, [session, isSessionLoaded, isUserLoaded, user])

  if (!isUserLoaded || !isSessionLoaded) {
    // ... loading spinner
  }

  // ... rest of your component
}
