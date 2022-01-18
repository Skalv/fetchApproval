import '../styles/globals.scss'

import Head from 'next/head'
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
// import { Provider } from "next-auth/client"

function getLibrary(provider, connector) {
  return new Web3Provider(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    // <Provider session={pageProps.session}>
    <Web3ReactProvider getLibrary={getLibrary} >
      <Head>
        <title>Fetch approval</title>
        <meta name="description" content="Fetch all approval of your wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Web3ReactProvider>
    // </Provider >
  )
}

export default MyApp
