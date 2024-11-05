import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
export default async function DiscoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //fetch user data
  const user = 1
  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div>
        {children}
      </div>
    </div>
  )
}
