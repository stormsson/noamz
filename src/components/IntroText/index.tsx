import styles from "./IntroText.module.scss";
import { GlobalContext } from "../../context";
import { useState , useContext } from "react";
import { AppProps } from "next/app";




const IntroText = (props) => {
    
    const [activeModal, setActiveModal ] = useState("");

    const toggleModal = (event: any) => {
        event.stopPropagation();
        
        if(activeModal == "") {
            setActiveModal("is-active");
        } else {
            setActiveModal("");
        }

    }
    

    return (
        <div className={styles.introContainer}>

            <div className={"block columns m-2"}>            
                <div className={"column columnitem"}>
                    <h2>What is this ?</h2>
                    <div className={styles.introDescription}>
                        <p><strong>NoAMZ</strong> is my personal project to track the money I choose to not give to <strong>Lex Luthor</strong>.</p>
                        <p>When I want to buy something and I reach his store I take the time to search for the same product from a different source instead.</p>
                        <p>My first "second choice" are <strong>local stores</strong>: places where I'm sure that my money will reach a family and will <strong>support local economy</strong>.</p>                        
                        <br/>
                        <p>Just a drop taken from their ocean.</p>
                    </div>

                    <div className={"columns "+styles.columns}>
                        <div className={"column"}>
                            <a href="#" onClick={toggleModal}>FAQ</a>
                        </div>
                        

                    </div>
                    <hr/>

                </div>

            </div>
            <div className={"modal " + activeModal}>
                <div className={"modal-background"}></div>
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}>
                        <p className={"modal-card-title"}>FAQ</p>
                        <button className={"delete"} onClick={toggleModal} aria-label="close"></button>
                    </header>
                    <section className={"modal-card-body"}>
                        <strong>How does this work?</strong>
                        <p>There is a smart contract somewhere where I save the informations for a future purpose.</p>
                        <p>Periodically the page updates and the new values are shown.</p>

                            <nav className={styles.level}>
                                <div className={"level-item "+styles['level-item']}>
                                    <hr/>
                                </div>
                            </nav>

                        <strong>Can I Join?</strong>
                        <p>Since this is a trust based log and I didn't find a way to validate entries, I'm not enabling external contribution.</p>
                        <p>This project will be opensourced as soon as I see that's stable enough, and if you'll like this you'll be able to clone everything.</p>
                        <p>
                            <strong>
                                <a href="https://twitter.com/stormsson/">Contact me</a>
                            </strong> if you are interested.
                        </p>
                            <nav className={styles.level}>
                                <div className={"level-item "+styles['level-item']}>
                                    <hr/>
                                </div>
                            </nav>
                        <strong>Can I Help?</strong>
                        <p>At the moment I don't have many features to work on; feel free to <strong>
                                <a href="https://twitter.com/stormsson/">contact me</a>
                            </strong> if you have suggestions!</p>
                    </section>
                    <footer className={"modal-card-foot"}>

                    </footer>
                </div>
            </div>
        </div>
    )
};

export default IntroText;

