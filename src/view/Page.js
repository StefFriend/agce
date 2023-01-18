import React, {useContext} from 'react';
import {ChordsElect} from "../components";
import styles from './Page.module.css'
import {AppContext} from "../context/AppContext";
import banner from '../data/banner.png';


const Page = () => {
  const appData = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.banner} src={banner} />
        <br/><br/><br/>
      </div>
      <div className={styles.row}>
        <ChordsElect chords={appData.chordList} index={0}/>
        <ChordsElect chords={appData.chordList} index={1}/>
        <ChordsElect chords={appData.chordList} index={2}/>
        <ChordsElect chords={appData.chordList} index={3}/>
      </div>
      <div className={styles.row}>
        {appData.sequenceChords.data.map((x, i) => {
          if (x !== null) {
            return (
              <>
                <div className={styles.column}>
                  <div className={styles.text}>
                    IntraComplexity: {appData.functions.intraComplexity(appData.chordList, x)}
                  </div>
                  {appData.sequenceChords.data[i + 1] !== null && appData.sequenceChords.data[i + 1] !== undefined ?
                    <div className={styles.inter}>
                     {/* CD: {appData.functions.interComplexity2chords(appData.chordList, x, appData.sequenceChords.data[i + 1])}*/}
                      <br/>
                      InterComplexity: {appData.functions.interComplexity(appData.chordList, x, appData.sequenceChords.data[i + 1])}

                      </div> : <div className={styles.text}/>
                  }

                </div>

              </>)


          } else {
            return <div className={styles.column}/>
          }
        })}




      </div>

      {!appData.sequenceChords.data.includes(null) ? <div className={styles.fullText}>
        GlobalComplexity: {appData.functions.globalD(appData.chordList, appData.sequenceChords.data[0], appData.sequenceChords.data[1], appData.sequenceChords.data[2], appData.sequenceChords.data[3])}

      </div>: console.log("null")}

    </div>
  );
};

export default Page;
