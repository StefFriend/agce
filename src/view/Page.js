import React, {useContext, useEffect} from 'react';
import {ChordsElect, Fretboard} from "../components";
import styles from './Page.module.css'
import {AppContext} from "../context/AppContext";


const Page = () => {
    const appData = useContext(AppContext);

    return (
        <div className={styles.container}>
            <h1>AGCE - A Guitar Chords Evaluator</h1>
            <div className={styles.row}>
                <ChordsElect chords={appData.chordList} index={0}/>
                <ChordsElect chords={appData.chordList} index={1}/>
                <ChordsElect chords={appData.chordList} index={2}/>
                <ChordsElect chords={appData.chordList} index={3}/>
            </div>
            <div className={styles.row}>
                {appData.sequenceChords.data.map((x, i) => {
                    if (x !== null) {
                        return <div className={styles.column}>
                        <div className={styles.text}>
                            Difficoltà intra accordo: {appData.functions.intraComplexity(appData.chordList, x)}
                        </div>
                            {appData.sequenceChords.data[i+1] !== null && appData.sequenceChords.data[i+1] !== undefined ?
                                <div className={styles.text}>
                                Difficoltà inter accordo: {appData.functions.interComplexity2chords(appData.chordList, x, appData.sequenceChords.data[i+1])}
                                    <br/>
                                    Global complexity: {appData.functions.globalComplexity(appData.chordList, x, appData.sequenceChords.data[i+1])}
                                </div> : <div className={styles.text}/>
                            }

                        </div>

                    } else {
                        return <div className={styles.column}/>
                    }
                })}


            </div>

            <Fretboard/>


        </div>
    );
};

export default Page;