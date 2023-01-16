import React, {useContext, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styles from './ChordsElect.module.css'
import {AppContext} from "../../context/AppContext";
import app from "../../App";
import {Instrument, Song, Track} from "reactronica";
import {Fretboard, Tablature} from "../index";

const ChordsElect = (props) => {
    const appData = useContext(AppContext)
    const {chords, index} = props;
    const [chord, setChord] = useState('');

    const handleChange = (event) => {
        appData.functions.defineSelectedChords(event.target.value, index)
        setChord(event.target.value);
        appData.play.setSelected(null);
        appData.functions.createStepsArray(appData.chordList, event.target.value, index)
    };

    return (
        <>
            <div className={styles.container}>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chord</InputLabel>
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
                {/*<GuitarChord
                    chordName='C major' appData.sequenceChords.data[index]
                    frets={['x', 3, 2, 0, 1, 0]}
                />*/}

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