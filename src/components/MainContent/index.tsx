import styles from "./MainContent.module.scss";
import { GlobalContext } from "../../context";
import { useState , useContext } from "react";


import { IMainContentProps } from "../../types/Props";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { AppProps } from "next/app";




// const { ethers } = require("ethers");


// export async function getStaticProps(context) {

//     const ALCHEMY_API_KEY = "q0cZ1B0mPqB4vmtOFBkPn2flLAWk2v8j";

//     const provider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

//     const contractABI = [
//         "function balanceOf(address a) public view returns(uint256)",
//         "function countTransactions(address a) public view returns(uint256)",
//         "function addTransaction(address sender, uint256 amount) external ",
//     ]

//     const contractAddress = "0xBf72da23f814487B66BbEaF0b9061dc7315207C6";

//     const contract = new ethers.Contract(contractAddress, contractABI, provider);


//     const ASD = await contract.balanceOf("0x2b9717ccd4B5d2562eE04D587b8D6048DD6f6A00");
//     console.log("ASD: ", ASD);

//     return {
//       props: {
//         'balance': ASD,
//       }, // will be passed to the page component as props
//       revalidate: 10, // seconds
//     }
//   }
  

const formatDate = (formattedDate: Date) => {

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];  


    return formattedDate.getDate() +" / "
        + monthNames[formattedDate.getMonth()]


}

const MainContent = (props: IMainContentProps) => {
    // const provider = new ethers.providers.AlchemyProvider("ropsten");

    // const {wallet, setWallet, signer} = useContext(GlobalContext)


     const balance_euro = (props.balance/100).toFixed(2);
     const total_euro = (props.total/100).toFixed(2);

    //  const nft_amount = props.NFTData.nfts.length;
    // const last_datetime = props.NFTData.nfts[0].timeLastUpdated;
    // const formattedDate = formatDate(new Date(last_datetime))
    // const nftArray = props.NFTData.nfts;
    
    const nft_amount = Object.keys(props.NFTData).length;
    const formattedDate = formatDate(new Date());


    return (
        <div className={"container mt-2 "+styles.megaContainer} >
            <div className={styles.mainBlockContainer}>

                <div className={"columns block"}>
                    <div className={"column is-one-third"}>
                        <div className={styles.columnitem}>
                            I avoided Jeff's store <div className={styles.importantvalue}>{nft_amount} times</div>
                        </div>
                    </div>
                    <div className={"column  is-one-third"}>
                        <div className={styles.columnitem}>
                            I didn't give Jeff <div className={styles.importantvalue}>{total_euro} €</div>
                        </div>

                    </div>
                    <div className={"column  is-one-third"}>
                        <div className={styles.columnitem}>
                            Last update 
                            <div className={styles.importantvalue}>{formattedDate}</div>
                        </div>

                    </div>                
                </div>
            </div>
        
            
            <div className={"block timelinecontainer"}>
                <VerticalTimeline lineColor="#febd69">

                    {Object.keys(props.NFTData).reverse().map((key:string, index:number) =>  

                        <VerticalTimelineElement
                            key={index}
                            className="test"
                            //  className={styles.test}
                            // contentStyle={{ background: 'rgb(33, 150, 243);'}}
                            contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                            // date={formatDate(new Date(el.timeLastUpdated))}
                            iconStyle={{ background: '#fbebbc', color: '#febd69' }}
                            dateClassName="itemdate"                
                        >
                            <h3 className={"vertical-timeline-element-title "+styles.itemPrice}> {(parseFloat(props.NFTData[key].attributes[0].value)/100).toFixed(2)} &euro;</h3>
                            <h4 className="vertical-timeline-element-subtitle">{props.NFTData[key].name}</h4>
                            <div> 
                                {props.NFTData[key].description}
                            </div>
                            
                        </VerticalTimelineElement>
                    )}
                

                </VerticalTimeline>
            </div>

        </div>
    )
};

export default MainContent;

