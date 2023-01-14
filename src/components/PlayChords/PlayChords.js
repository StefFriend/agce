import React, {useContext, useState} from 'react';
import {AppContext} from "../../context/AppContext";
import {Instrument, Song, Track} from "reactronica";

const PlayChords = () => {
    const appData = useContext(AppContext);
    const [steps, setSteps] = useState([
        ['C3', 'E3', 'A3'],
        null,
        ['C3', 'E3', 'G3', 'B3'],
        null,
        ['C3', 'F3', 'A3'],
        null,
        ['D3', 'G3', 'B3'],
        null,
    ]);


    return (
        <>
            <Song isPlaying={appData.play.value} >
                <Track steps={steps}>
                    <Instrument type="synth"/>
                </Track>
            </Song>
        </>
    );
};

export default PlayChords;