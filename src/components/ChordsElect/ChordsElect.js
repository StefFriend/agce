import React, {useContext, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styles from './ChordsElect.module.css'
import {AppContext} from "../../context/AppContext";
import Guitar, {getRenderFingerSpn} from "react-guitar";
import {standard} from 'react-guitar-tunings'
import useSound, { withSoundFont } from 'react-guitar-sound'
import {Fretboard, Tablature} from "../index";
import GuitarChord from 'react-guitar-chords';
//disinstallare vexflow e vextab
const acousticGuitar = withSoundFont('acoustic_guitar_steel');



const ChordsElect = (props) => {
    const appData = useContext(AppContext)
    const {chords, index} = props;
    const [chord, setChord] = useState('');
    //React-Guitar
    const {play, strum} = useSound({instrument: acousticGuitar, fretting: appData.sequenceChords.fretsArray[index], tuning: standard,});

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


                <FormControl variant="filled" sx={{m: 1, maxWidth: 450}}>
                    <InputLabel id="demo-simple-select-label">Select a chord</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chord}
                        label="Chord"
                        onChange={handleChange}
                        style={{backgroundColor: 'white'}}
                    >
                        {chords.map((x) => {
                            return <MenuItem value={x.name}>{x.name}</MenuItem>
                        })}


                    </Select>


                  <Guitar className={styles.guitar} strings={appData.sequenceChords.fretsArray[index]} //fretarray
                          center renderFinger={getRenderFingerSpn(standard)}
                          onPlay={play}
                          frets={{ from: 0, amount: 12,}}
                  />
                    <button class={styles.button} role="button" onClick={() => strum()} title="Strum">
                      Strum
                    </button>

                  <Tablature index={index}/>
                  <div className={styles.chart}>
                  <GuitarChord
                    chordName= {false}
                    frets={appData.functions.inverseFretArray(appData.sequenceChords.fretsArray[index])}
                    music={false}
                  />
                    {/*<div className={styles.vexbox}>
                      <div id="boo"></div>
                    </div>*/}
                  </div>
                </FormControl>




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
