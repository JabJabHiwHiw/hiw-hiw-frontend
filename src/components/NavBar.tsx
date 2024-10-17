import Image from 'next/image'
import Link from 'next/link'
import NotiPopover from './NotiPopover'

export default function NavBar() {
  return (
    <div className="w-full h-[79px] bg-primary-300 flex items-center justify-between px-4">
      
      <div className='flex space-x-6'>
        <Link href="/" className="h2 font-bold text-black">
          HIWHIW
        </Link>
      </div>

      <div className='flex space-x-6'>
        <Link href="/" className="h4 font-bold text-black">
          Discover
        </Link>
        <div>|</div>
        <Link href="/fridge" className="h4 text-black">
          Fridge
        </Link>
      </div>

      <div className='flex space-x-6 items-center'>
        <NotiPopover/>
        <a href="/profile" className='flex space-x-6 items-center'>
        <Image
          src={'/img/mock_profile.png'}
          className="rounded-full"
          alt="profile"
          width={50}
          height={50}
          sizes="100vh"
        />
        <h4 className='h4 text-black'>Mock Name</h4>
      </a>
      </div>

    </div>
  )
}
