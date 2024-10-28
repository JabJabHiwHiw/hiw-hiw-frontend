import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
export default async function ProfileLayout({
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
      <main>{children}</main>
    </div>
  )
}
