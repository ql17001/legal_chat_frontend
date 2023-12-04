'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import useProtectedRoutes from '@/hooks/useProtectedRoutes';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useProtectedRoutes();

  return (
    <html lang="es">
      <head>
        <title>LegalChat</title>
      </head>
      <body className='flex flex-col min-h-screen'>
      <Header/>
      <Container>
        {children}
       </Container>
        <Footer/>
        </body> 
    </html>
  )
}
