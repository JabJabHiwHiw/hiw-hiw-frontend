import Navbar from '../_components/navbar'
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
