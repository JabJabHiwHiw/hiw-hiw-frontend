import Navbar from '../_components/navbar'
export default async function DiscoverLayout({
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
