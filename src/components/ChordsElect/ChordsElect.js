import React, {useContext, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styles from './ChordsElect.module.css'
import {AppContext} from "../../context/AppContext";
import Guitar, {getRenderFingerSpn} from "react-guitar";
import {standard} from 'react-guitar-tunings'
import useSound, { withSoundFont } from 'react-guitar-sound'
import app from "../../App";
import {Instrument, Song, Track} from "reactronica";
import {Fretboard, Tablature} from "../index";
import GuitarChord from 'react-guitar-chords';
/*import { Vex, Stave, StaveNote, Formatter } from "vexflow";
import {VexTab, Artist } from 'vextab';*/
//disinstallare vexflow e vextab
const acousticGuitar = withSoundFont('acoustic_guitar_steel');


const ChordsElect = (props) => {
    const appData = useContext(AppContext)
    const {chords, index} = props;
    const [chord, setChord] = useState('');
    //React-Guitar
    const {play, strum} = useSound({instrument: acousticGuitar, fretting: appData.sequenceChords.fretsArray[index], tuning: standard,});
    /*const VF = vextab.Vex.Flow

    const renderer = new VF.Renderer($('#boo')[0],
      VF.Renderer.Backends.SVG);

  // Initialize VexTab artist and parser.
    const artist = new vextab.Artist(10, 10, 150, { scale: 0.8 });
    const tab = new vextab.VexTab(artist);
    const data = `

    tabstave notation=true
    notes (0/1.1/2.0/3.2/4.3/5) |
  
    `
    try {
      tab.parse(data);
      artist.render(renderer);
    } catch (e) {
      console.error(e);
    }*/

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


                <FormControl sx={{m: 1, maxWidth: 450}}>
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

                  <Guitar className={styles.guitar} strings={appData.sequenceChords.fretsArray[index]} //fretarray
                          center renderFinger={getRenderFingerSpn(standard)}
                          onPlay={play}
                          frets={{ from: 0, amount: 12,}}
                  />
                    <button class={styles.button39} role="button" onClick={() => strum()} title="Strum">
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
