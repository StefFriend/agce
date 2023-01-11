import React from 'react';
import styles from './Notes.module.css'
import Mask from "./Mask";


const Notes = () => {
    return (
        <div className={styles.container}>
            <Mask/>
        </div>
    );
};

export default Notes;