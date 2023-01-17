import React, {useContext, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styles from './ChordsElect.module.css'
import {AppContext} from "../../context/AppContext";
import Guitar, {getRenderFingerSpn} from "react-guitar";
import {standard} from 'react-guitar-tunings'
import useSound from 'react-guitar-sound'
import app from "../../App";
import {Instrument, Song, Track} from "reactronica";
import {Fretboard, Tablature} from "../index";
import GuitarChord from 'react-guitar-chords';


const ChordsElect = (props) => {
    const appData = useContext(AppContext)
    const {chords, index} = props;
    const [chord, setChord] = useState('');
    const {play} = useSound({fretting: appData.sequenceChords.fretsArray[index], tuning: standard});

    const handleChange = (event) => {
        appData.functions.defineSelectedChords(event.target.value, index);
        setChord(event.target.value);
        appData.play.setSelected(null);
        appData.functions.createStepsArray(appData.chordList, event.target.value, index);
        appData.functions.fretsArrayForTab(appData.chordList, event.target.value, index);
    };

    return (
        <>
            <div className={styles.container}>


                <FormControl sx={{m: 1, maxWidth: 200}}>
                    <InputLabel id="demo-simple-select-label">Select a chord</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chord}
                        label="Chord"
                        onChange={handleChange}
                    >
                        {chords.map((x) => {
                            return <MenuItem value={x.name}>{x.name}</MenuItem>
                        })}


                    </Select>
                </FormControl>


                <Guitar className={styles.guitar} strings={appData.sequenceChords.fretsArray[index]} //fretarray
                        center renderFinger={getRenderFingerSpn(standard)}
                        playOnHover id={index}
                        onPlay={play}/>

                <Tablature index={index}/>
                <GuitarChord
                    chordName= {appData.sequenceChords.data[index]}
                    frets={appData.sequenceChords.fretsArray[index]}
                />

                {/*<button onClick={() => {

                    if (appData.play.selected !== chord) {
                        appData.play.setValue(false);
                        appData.functions.createStepChord(appData.chordList, chord)
                        appData.play.setSelected(index);
                    }

                    appData.play.setValue(!appData.play.value);


                }}>Play
                </button>*/}
            </div>


        </>
    );
};
export default ChordsElect;
