import Footer from './Footer'
import Header from './Header'
import './globals.css'
import { Inter } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Covercraft',
  description: 'Generate your cover letter with GPT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
