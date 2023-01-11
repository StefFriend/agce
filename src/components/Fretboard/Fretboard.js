import React from 'react';
import styles from './Fretboard.module.css'
import Capo from "../Frets/Capo";
import {Strings, Fret} from "../index";
import Notes from "../Notes/Notes";

const Fretboard = () => {
    return (
        <div className={styles.container}>
            <Capo/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Fret/>
            <Strings/>
            <Notes/>

        </div>
    );
};

export default Fretboard;