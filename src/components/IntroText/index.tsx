import styles from "./IntroText.module.scss";
import { GlobalContext } from "../../context";
import { useState , useContext } from "react";





const IntroText = (props) => {

     console.log(props)

    

    return (
        <div className={styles.introContainer}>

            <div class="block columns m-2">            
                <div class="column columnitem">
                    <h2>What is this ?</h2>
                    <div className={styles.introDescription}>
                        <p><strong>UNNAMED PROJECT</strong> is my personal project to track of the money I choose to not give to <strong>Lex Luthor</strong>.</p>
                        <p>When I need / want to buy something and I reach his store I take the time to search for the same product from different vendors.</p>
                        <p>My first "second choice" are <strong>local stores</strong>: where I'm sure that my money will reach a family and will <strong>support local economy</strong>.</p>                        

                    </div>
                    <hr/>

                </div>

            </div>
        </div>
    )
};

export default IntroText;

