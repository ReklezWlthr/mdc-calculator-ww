import { Fragment, useState } from 'react'
import { NavBar } from '../src/presentation/components/navbar'
import '../styles/globals.css'
import '../styles/index.css'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from '@src/data/providers/app_store_provider'
import { Modal } from '@src/presentation/components/modal'
import { Toast } from '@src/presentation/components/toast'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <StoreProvider {...pageProps}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="https://use.fontawesome.com/releases/v6.5.2/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/logo.svg" />
        <title>MD✦C Calculator</title>
        <meta name="google-site-verification" content="SWAMBA11X0hqeGKH-lQYsBY-qReI16suADm0Iew1UT8" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <div className="flex flex-col w-screen h-screen max-h-screen overflow-x-hidden min-w-[1440px]">
          <Modal />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MyApp
