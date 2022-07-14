import styles from "./MainContent.module.scss";
import { GlobalContext } from "../../context";
import { useState , useContext } from "react";



import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


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


//     const CRISTO = await contract.balanceOf("0x2b9717ccd4B5d2562eE04D587b8D6048DD6f6A00");
//     console.log("CRISTO: ", CRISTO);

//     return {
//       props: {
//         'balance': CRISTO,
//       }, // will be passed to the page component as props
//       revalidate: 10, // seconds
//     }
//   }
  

const MainContent = (props) => {
    // const provider = new ethers.providers.AlchemyProvider("ropsten");

    // const {wallet, setWallet, signer} = useContext(GlobalContext)

     console.log(props)

     const balance_euro = (props.balance/100).toFixed(2);
     const total_euro = (props.total/100).toFixed(2);




    return (
        <div>
            <div>Sono il main content</div>
            
            <div>time è: {props.time}  </div>
            <div>balance è: {balance_euro}  </div>
            <div>total è: {total_euro}  </div>


            <VerticalTimeline lineColor="#febd69">

                {props.NFTData.nfts.map((el, index) => 
                    <VerticalTimelineElement
                    key={index}
                    className="test"
                    //  className={styles.test}
                    // contentStyle={{ background: 'rgb(33, 150, 243);'}}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={el.timeLastUpdated}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    dateClassName="itemDate"                
                >
                    <h3 className="vertical-timeline-element-title"> {parseFloat(el.metadata.attributes[0].value).toFixed(2)}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{el.title}</h4>
                    <div> 
                        {el.description}
                    </div>
                </VerticalTimelineElement>
                )}
               

            </VerticalTimeline>
        </div>
    )
};

export default MainContent;

