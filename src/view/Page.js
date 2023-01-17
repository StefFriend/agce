import React, {useContext} from 'react';
import {ChordsElect} from "../components";
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
                            {appData.sequenceChords.data[i + 1] !== null && appData.sequenceChords.data[i + 1] !== undefined ?
                                <div className={styles.text}>
                                    CD: {appData.functions.interComplexity2chords(appData.chordList, x, appData.sequenceChords.data[i + 1])}
                                    <br/>
                                    InterComplexity: {appData.functions.globalComplexity(appData.chordList, x, appData.sequenceChords.data[i + 1])}
                                  <br/>
                                  Global: {appData.functions.globalD(appData.chordList, appData.sequenceChords.data[i], appData.sequenceChords.data[i + 1], appData.sequenceChords.data[i + 2], appData.sequenceChords.data[i + 3])}
                                </div> : <div className={styles.text}/>
                            }

                        </div>

                    } else {
                        return <div className={styles.column}/>
                    }
                })}


            </div>

            {/*<Fretboard/>*/}

            {/*<button onClick={() => {
                appData.play.setSelected(null);
                appData.play.setValue(!appData.play.value);
            }}>{appData.play.value ? 'Stop' : 'Play'}</button>

            {appData.play.selected === null ? <PlayChords play={appData.play.value} steps={appData.play.step}/> :
                <PlayChords play={appData.play.value} steps={appData.play.stepChord}/>}*/}


        </div>
    );
};

export default Page;
