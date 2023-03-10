import React, {useMemo, useState} from "react";

import produce from "immer";

/* FROM JSON*/
import chordList from '../data/json/chords.json';
import noteDict from '../data/json/noteDict.json';

export const AppContext = React.createContext({});

export function useAppContext() {

    const [chordsArray, setChordsArray] = useState([null, null, null, null]);
    const [playAll, setPlayAll] = useState(false);
    const [playChord, setPlayChord ] = useState(null);
    const [step, setStep] = useState([null, null, null, null]);
    const [stepChord, setStepChord] = useState([null, null, null])

    // questo array viene passato a guitar per definire quali accordi deve mostrare
    const [fretsArray, setFretsArray] = useState([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]])

    /**
     * @param chordList
     * @param chordName selected chord
     * @param step Step array
     * @param index index selected chord
     */

    const createStepsArray = (chordList, chordName, index) => {
        let selectedChord = chordList.filter(x => x.name === chordName);

        let notesArray = [];
        selectedChord = selectedChord[0].pattern;
        selectedChord.map((x,i) => {
            if(x.note !== null && !notesArray.includes(x.note)  ) {
                notesArray.push(x.note);
            }
        })

        setStep(produce(step, draft => {
            draft[index] = notesArray;
        }))

    }

    const createStepChord = (chordList, chordName) => {
        let selectedChord = chordList.filter(x => x.name === chordName);

        let notesArray = [];
        selectedChord = selectedChord[0].pattern;
        selectedChord.map((x,i) => {
            if(x.note !== null && !notesArray.includes(x.note)  ) {
                notesArray.push(x.note);
            }
        })

        setStepChord(produce(stepChord, draft => {
            draft[0] = notesArray;
        }))

    }

    /**
     * Add chords to sequence
     */

    const defineSelectedChords = (chordName, index) => {

        setChordsArray(produce(chordsArray, draft => {
           draft[index] = chordName;
        }))


    }

    /**
     *  Function to save only fret
     * @param pattern
     * @returns {*[]}
     */
    const fretArray = (pattern) => {
        let fret = [];
        for (let i = 0; i < pattern.length; i++) {
            fret.push(pattern[i].fret);
        }
        return fret;
    }

    /**
     * Function to save only fingered strings
     * @param pattern - is the array of the chords.json
     * i - is the string index (from 0 to 5)
     * @returns {}[string]
     *
     */
    const stringArray = (pattern) => {
        let string = [];
        // index i is the index of the string
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i].fret > 0) {
                string.push(i);
            }
        }
        return string;
    }

    const fretsArrayForTab = (chordList, chordName, index) => {
        let pattern = chordList.filter(x => x.name === chordName);
        pattern = pattern[0].pattern;
        //console.log("PATTERN", pattern)
        let frets = fretArray(pattern);
        //console.log("FRETSSSSSSS", frets)
        setFretsArray(produce(fretsArray, draft => {
            draft[index] = frets;
        }))
    }

  /**
   * Function to invert array order
   * @param FretsArray - is the array in descending form
   * i - is the fret/string index (from 0 to 5)
   * @returns inverseArray
   *
   */
    const inverseFretArray = (FretsArray) =>{
      let inverseArray = []
      inverseArray = FretsArray.slice().reverse()
      for (let i=0;i<inverseArray.length;i++){
        if (inverseArray[i] === -1){
          inverseArray[i] = 'x'
        }
      }

      return inverseArray;
    }

    /**
     * Funzione per calcolare la distanza tra il tasto minore e quello maggiore
     * @param array
     * @returns {number}
     */
    const disFrets = (array) => {
        const filteredArray = array.filter(x => x >= 1); //filtered > 1 for frets!!!
        const max = Math.max(...array);
        const min = Math.min(...filteredArray);
        return max-min;
    }

    /**
     * Funzione per calcolare la distanza tra la corda minore e la corda maggiore
     * @param array
     * @returns {number}
     */
    const disStrings = (array) => {
        const max = Math.max(...array);
        const min = Math.min(...array);
        return max-min;
    }

    /**
     * Funzione per creare una riga della matrice inter accordo, dato il json e il nome dell'accordo selezionato dall'utente
     * @returns {*[]} - Gli elementi dell'array sono le corde su cui sono poggiate le varie dita
     * @param chordList
     * @param chordName
     */

    const createFingerArray = (chordList, chordName) => {
        let filtered = chordList.filter(x => x.name === chordName)
        let fingerArray = [];
        for (let i=0; i<4; i++){
            for (let j=0; j<filtered[0].pattern.length; j++){
                if (filtered[0].pattern[j].finger === i){
                    fingerArray[i] = j
                    j = filtered[0].pattern.length
                }
            }
            if( fingerArray[i] === undefined) {
                fingerArray[i] = -1
            }
        }

        return fingerArray;
    }


    /**
     * Function to calculate intraComplexity of single chord
     * N.B. calculate also finger stress for MaxFret > 3
     * @param chordList
     * @param chordName
     @returns {number}
     */
    const intraComplexity = (chordList, chordName) => {
        let pattern = chordList.filter(x => x.name === chordName);
        pattern = pattern[0].pattern;
        //console.log("PATTERN", pattern)
        let frets = fretArray(pattern);
        let maxFret = Math.max(...frets);
        let strings = stringArray(pattern);
        let distanceFrets = disFrets(frets);
        let distanceStrings = disStrings(strings);
        let fingerArray = createFingerArray(chordList, chordName);
        let countFingers = 0;
        for (let i = 0; i < 4; i++){
            if(fingerArray[i] >= 0){
                countFingers++;
            }
        }

        if (maxFret > 3) {
            return Math.round(Math.sqrt((distanceFrets + distanceStrings + (maxFret - 3))) * countFingers *0.25*1000)/1000; //per ogni dito in pi?? moltiplichiamo .25
        } else {
            return Math.round(Math.sqrt(Math.sqrt((distanceFrets + distanceStrings))) * countFingers * 0.25*1000)/1000;
        }
    }

  /**
   * cd - see slides
   * @param chordList
   * @param chord1
   * @param chord2
   * @returns {number}
   */

    const interComplexity2chords = (chordList, chord1, chord2) => { //equivale a cd in formula
        const fingerArray1 = createFingerArray(chordList, chord1);
        const fingerArray2 = createFingerArray(chordList, chord2);

        let interDistance = 0;

        for (let i=0; i<4; i++) {
            if(fingerArray1[i] < 0 || fingerArray2[i] < 0){
                if (fingerArray2[i] < 0 && fingerArray1[i] < 0) {
                    interDistance = (Math.round((interDistance + Math.abs(fingerArray2[i] - fingerArray1[i]))*1000)/1000);
                } else if (fingerArray1[i] < 0){ // se aggiungo 1 dito aggiungo 1
                    //interDistance = interDistance + Math.abs(fingerArray2[i])
                    interDistance = (Math.round((interDistance + 1)*1000)/1000);
                } /* se tolgo un dito non aggiungo nulla
                else {
                    //interDistance = interDistance + Math.abs(fingerArray1[i])
                    interDistance = interDistance + 0
                }*/
            } else {
                interDistance = (Math.round((interDistance + Math.abs(fingerArray2[i] - fingerArray1[i]))*1000)/1000);
            }

        }
        return interDistance;
    }


    /**
     * interComplexity between two consecutive chords
     * @param chordList
     * @param chord1
     * @param chord2
     * @returns {difficulty}
     */
    const interComplexity = (chordList, chord1, chord2) => { //equivale a inter in appunti
        let intra1 = intraComplexity(chordList, chord1);
        let intra2 = intraComplexity(chordList, chord2);
        let inter = interComplexity2chords (chordList, chord1, chord2)

       // console.log("Intra of ", chord1, "is", intra1);
       // console.log("Intra of ", chord2, "is", intra2);
       // console.log("cd of ", chord1, chord2, "is", inter);
        let difficulty = Math.round((intra2 - intra1 + inter)*1000)/1000;

        if(difficulty < 0) {
            difficulty = 0
        }

        return difficulty
    }
  /**
   * GlobalComplexity as a mean between all 4 chords
   * @param chordList
   * @param chord1
   * @param chord2
   * @param chord3
   * @param chord4
   * @returns {number}
   */
    const globalD = (chordList, chord1, chord2, chord3, chord4) => {
      let inter1 = interComplexity2chords (chordList, chord1, chord2)
      let globalDif = Math.round((inter1 /2)*1000)/1000;
      if (chord3 != null) {
        var inter2 = interComplexity2chords(chordList, chord2, chord3)
        globalDif = Math.round(((inter1 + inter2) /3)*1000)/1000;
      }
      if (chord4 != null) {
        var inter3 = interComplexity2chords(chordList, chord3, chord4)
        globalDif = Math.round(((inter1 + inter2 + inter3) /4)*1000)/1000;
      }
      // console.log("Intra of ", chord1, "is", intra1);
      // console.log("Intra of ", chord2, "is", intra2);
      // console.log("cd of ", chord1, chord2, "is", inter);
      globalDif = Math.round(((inter1 + inter2 + inter3)/3)*1000)/1000;

      if(globalDif < 0) {
        globalDif = 0
      }

      return globalDif
    }


    return useMemo(
        () => ({
            chordList,
            functions: {
                fretArray: fretArray, // define fret array of single chord
                stringArray: stringArray, // define string array of single chord
                disStrings: disStrings, // calculate distance from max string and min string
                disFrets: disFrets, // calculate distance from max fret and min fret
                intraComplexity: intraComplexity, // calculate intra complexity
                createFingerArray: createFingerArray, // define array of used finger
                interComplexity2chords: interComplexity2chords, // calculate inter complexity of 2 chords
                interComplexity: interComplexity, // calculate global complexity from chord 1 to chord 2
                defineSelectedChords: defineSelectedChords,
                createStepsArray: createStepsArray,
                createStepChord: createStepChord,
                fretsArrayForTab: fretsArrayForTab,
                inverseFretArray: inverseFretArray,
                globalD: globalD,
            },

            sequenceChords: {
                data: chordsArray, //chord name
                setData: setChordsArray,
                fretsArray: fretsArray //chord array (frets)
            },
            play:{
                value: playAll,
                setValue: setPlayAll,
                selected: playChord,
                setSelected: setPlayChord,
                step: step,
                stepChord: stepChord,
            },

        }), [chordsArray, playAll, step, stepChord, fretsArray]
    );

}

