import React, {useContext, useState} from 'react';
import {AppContext} from "../../context/AppContext";
import {Instrument, Song, Track} from "reactronica";

const PlayChords = (props) => {
    const {play, steps} = props

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