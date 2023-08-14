import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return <>
          <SessionProvider session={session}>
           
            <Header />
            <div className='flex justify-center  min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-10' >

                    <Component {...pageProps} />
            </div>
            <Footer />
          
          </SessionProvider>
         
        
    </>
}
