import { createContext } from "react";

// Settings default values
// These will be overwritten later by specifying 'value'
export const GlobalContext = createContext({
  wallet: {},
  setWallet: (theme: any) => { },
  signer: {},
  setSigner: (value: any) => { },
})
