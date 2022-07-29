import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import ConnectButton  from '../components/ConnectButton'
import MainContent  from '../components/MainContent'
import IntroText  from '../components/IntroText'

import { getNFTData } from '../lib/getNFTData'
import { IMainContentProps } from '../types/Props'

const { ethers } = require("ethers");


export async function getStaticProps(context) {

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const myAddress = process.env.MY_ADDRESS;
  const network = process.env.PROVIDER_NETWORK

  const provider = new ethers.providers.AlchemyProvider(network, ALCHEMY_API_KEY);

  const ERC721ABI = [
      "function BM() public view returns(address)",
  ]

  const BalanceManagerABI = [
    "function balanceOf(address a) public view returns(uint256)",
    "function countTransactions(address a) public view returns(uint256)",
    "function addTransaction(address sender, uint256 amount) external ",
    "function total() public view returns(uint256)",
]

  const ERC721Contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ERC721ABI, provider)

  const BMAddress = await ERC721Contract.BM();
  const BMContract = new ethers.Contract(BMAddress, BalanceManagerABI, provider);



  const MyBalance = await BMContract.balanceOf("0x2b9717ccd4B5d2562eE04D587b8D6048DD6f6A00");
  const BMTotal = await BMContract.total();

  console.log("MyBalance: ", MyBalance.toString(),"TOTAL: ", BMTotal);

  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  console.log(time);


  let NFTData = await getNFTData();
  console.log(NFTData);

  return {
    props: {
      'balance': parseFloat(MyBalance.toString()),
      'total': parseFloat(BMTotal.toString()),
      'time' : time,
      NFTData
    }, // will be passed to the page component as props
    revalidate: 30, // seconds
  }

}

const Home: NextPage<IMainContentProps> = (props) => {

  


  return (
    <div className={styles.container}>
      <Head>
        <title>NoAMZ - A log to track how much money I didn't give to AMZ</title>
        <meta name="description" content="My log to track my personal effort toward a stronger local economy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <IntroText />
       <MainContent balance={props.balance} time={props.time} NFTData={props.NFTData} total={props.total}/>
              
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
