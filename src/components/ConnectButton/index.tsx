import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers"
import Web3Modal, { local } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import styles from "./ConnectButton.module.scss";

import { GlobalContext } from "../../context";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
};

const ConnectButton = () => {
  let web3Modal;
  

  let instance;
  let provider;
  let localSigner;
  
  const { wallet, setWallet, signer, setSigner } = useContext(GlobalContext)

  const connectWallet = async () => {

    try {
      instance = await web3Modal.connect();
    } catch (error) {
      console.log(error);
      return;
    }
    provider = new ethers.providers.Web3Provider(instance);
    localSigner = provider.getSigner();
    setSigner(localSigner)

    const a = await localSigner.getAddress();
    

    // const web3 = new Web3(provider);
    // const accounts = await web3.eth.getAccounts();
    setAccountNumber(a);
    console.log("EEE",a)
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setAccountNumber(null);
    setWallet({})
    setSigner({})
  };

  const checkConnection = async () => {
    // Check if browser is running Metamask

    // let web3: any;
    // if (window.ethereum) {
    //   web3 = new Web3(window.ethereum);
    // } else if (window.web3) {
    //   web3 = new Web3(window.web3.currentProvider);
    // }

    // // Check if User is already connected by retrieving the accounts
    // web3.eth.getAccounts().then(async (addr: string) => {
    //   setAccountNumber(addr);
    // });
  };

  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });

    checkConnection();
  }, [accountNumber]);

  return !accountNumber || accountNumber.length === 0 ? (
    <div className={styles.connectbtt}>
      <button onClick={connectWallet} className="button">
        Connect
      </button>
    </div>
  ) : (
    <div className={styles.connectbtt}>
      <button onClick={disconnectWallet} className="button">
        Disconnect <span>{accountNumber}</span>
      </button>
    </div>
  );
};

export default ConnectButton;
