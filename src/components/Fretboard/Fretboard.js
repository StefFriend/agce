import React from 'react';
import styles from './Fretboard.module.css'
import Capo from "../Frets/Capo";
import {Strings, Fret} from "../index";
import Notes from "../Notes/Notes";
import Guitar from 'react-guitar'
const Fretboard = () => {
    return (

        <Guitar className={styles.container} />

    );
};

export default Fretboard;