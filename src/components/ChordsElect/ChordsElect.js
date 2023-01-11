import React, {useContext, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {AppContext} from "../../context/AppContext";

const ChordsElect = (props) => {
    const appData = useContext(AppContext)
    const {chords, index} = props;
    const [chord, setChord] = useState('');

    const handleChange = (event) => {
        appData.functions.defineSelectedChords(event.target.value, index)
        setChord(event.target.value);
    };

    return (
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
    );
};
export default ChordsElect;