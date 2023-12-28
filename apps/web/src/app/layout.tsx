import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@foundation/ui/src/index.css'
import { Container } from '@foundation/ui/src/components/atoms/container'
import { Navbar } from '@foundation/ui/src/components/organisms/Navbar'
import { Footer } from '@foundation/ui/src/components/organisms/Footer'
import { SessionProvider } from '@foundation/ui/src/components/molecules/SessionProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foundation X | Karthick Ragavendran',
  description: 'The foundation for your monorepo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <SessionProvider>
            <Navbar />
          </SessionProvider>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  )
}
