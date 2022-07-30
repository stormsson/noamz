import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import ConnectButton  from '../components/ConnectButton'
import MainContent  from '../components/MainContent'
import IntroText  from '../components/IntroText'

import { getNFTData, getNFTOwners } from '../lib/getNFTData'
import { IMainContentProps } from '../types/Props'
import { timeStamp } from 'console'

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
    "function transactionCountPerUser(address a) public view returns(uint256)",
]

  const ERC721Contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ERC721ABI, provider)

  const BMAddress = await ERC721Contract.BM();
  const BMContract = new ethers.Contract(BMAddress, BalanceManagerABI, provider);

  const MyBalance = await BMContract.balanceOf(process.env.MY_ADDRESS);
  const BMTotal = await BMContract.total();
  const txCount = await BMContract.transactionCountPerUser(process.env.MY_ADDRESS);

  // console.log("TXC ",txCount)
  // console.log("MyBalance: ", MyBalance.toString(),"TOTAL: ", BMTotal);

  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();



  let NFTData = await getNFTData();
  let NFTOwners = await getNFTOwners();
  const burntTokens = NFTOwners.ownerAddresses.filter((i)=>{
    return i.ownerAddress == "0x0000000000000000000000000000000000000000"
  }) 

  let burntTokenIds = {}
  if(burntTokens.length>0) {
    burntTokens[0].tokenBalances.map((el)=> {
      burntTokenIds[el.tokenId] = true;
    })
  }

  let tmp = NFTData.nfts.filter((i) => { return (!('error' in i))  });
  tmp = tmp.filter((i)=> {
    const tokenId = i.id.tokenId;
    return (!(tokenId in burntTokenIds));
  })
  NFTData.nfts = tmp;
  // console.log(tmp);


  return {
    props: {
      'balance': parseFloat(MyBalance.toString()),
      'total': parseFloat(BMTotal.toString()),
      'time' : time,
      NFTData
    }, // will be passed to the page component as props
    revalidate: 3600, // seconds
  }

}

const Home: NextPage<IMainContentProps> = (props) => {

  console.log("Last Revalidation: ",props.time);


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
