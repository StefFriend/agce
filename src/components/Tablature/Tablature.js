import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";

const Tablature = (props) => {
const {index} = props
    const appData = useContext(AppContext)
    return (
        <div>
            {appData.sequenceChords.fretsArray[index].map((x, i) => {
                if (x === -1){
                    x = "x"
                }
                return <div>----------{x}----------</div>
            })}
        </div>
    );
};

export default Tablature;