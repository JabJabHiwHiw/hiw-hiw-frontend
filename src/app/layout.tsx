import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: 'HiwHiw',
  description: "Let's Cook!",
  icons: [{ rel: 'icon', url: '/svgs/logo-default.svg' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
