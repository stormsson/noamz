import 'bulma/css/bulma.min.css';

import '../styles/globals.css'
import '../styles/fonts.css'
import { useState } from "react";
import type { AppProps } from 'next/app'
import { GlobalContext } from "../context";

function MyApp({ Component, pageProps }: AppProps) {

  const [wallet, setWallet] = useState({});
  const [signer, setSigner] = useState({});

  return (
    <GlobalContext.Provider value={{ wallet, setWallet, signer, setSigner }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
