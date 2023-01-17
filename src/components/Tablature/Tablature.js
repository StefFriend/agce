import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import styles from "./Tablature.module.css";

const Tablature = (props) => {
const {index} = props
    const appData = useContext(AppContext)
    return (
        <div className={styles.text}>
            {appData.sequenceChords.fretsArray[index].map((x, i) => {
                if (x === -1){
                    x = "x"
                }
                return <div>----------{x}----------</div>
            })}
        </div>
    );
};

export default Tablature;
