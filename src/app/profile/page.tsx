'use client'

import { useUser } from '@clerk/nextjs'
import CustomTab from './_components/customTab'
import UserProfile from './_components/userProfile'
import { useEffect } from 'react'
export default function ProfilePage() {
  const { isLoaded: isUserLoaded, user } = useUser()
  useEffect(() => {
    if (!user) return
  }, [user])

  return (
    <div className="flex w-full justify-center py-12">
      <div className="flex gap-12 flex-col lg:flex-row items-center lg:items-start px-10 lg:px-0">
        {!isUserLoaded && <div>Loading...</div>}
        {isUserLoaded && user && user.fullName && user.primaryEmailAddress && (
          <UserProfile
            id={user.id}
            username={user.fullName}
            email={user.primaryEmailAddress.emailAddress}
            profileImageURL={user.imageUrl}
          />
        )}
        {user && <CustomTab userId={user.id} />}
      </div>
    </div>
  )
}
