import type { UserData } from '@/app/types'
import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'
import Image from 'next/image'

export default function UserProfile(props: UserData) {
  const { username, email, profileImageURL } = props
  const { signOut } = useClerk()
  return (
    <div className="flex flex-col w-[450px] ">
      <div className="h2 font-bold">Profile</div>
      <div className="flex flex-col items-center">
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={profileImageURL}
            alt="profile"
            fill={true}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex w-full flex-col gap-3 py-12">
          <div className="flex h3 justify-between">
            <div>Username</div>
            <div className="font-bold">{username}</div>
          </div>
          <div className="flex h3 justify-between">
            <div>Email</div>
            <div className="font-bold">{email}</div>
          </div>
        </div>
        <Button
          variant={'outline'}
          className="w-full"
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
