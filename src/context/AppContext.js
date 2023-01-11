import React, {useMemo, useState} from "react";

/* FROM JSON*/
import chordList from '../data/json/chords.json';
import produce from "immer";


export const AppContext = React.createContext({});

export function useAppContext() {

    const [chordsArray, setChordsArray] = useState([null, null, null, null]);

    /**
     * Add chords to sequence
     */

    const defineSelectedChords = (chordName, index) => {
        console.log("Define!" , chordName, index);
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
     * @returns {*[]}
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
    /*
    const MaxMin = (array) => {
        const max = Math.max(...array);
        const min = Math.min(...array);
    }*/

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
     * Funzione per calcolare la complessità intrinseca dell'accordo
     * distanza tasti + distanza corda
     * N.B. tiene conto anche della pressione del dito quando fa un barrè su un tasto > 3
     * @returns {number}
     * @param chordList
     * @param chordName
     */
    const intraComplexity = (chordList, chordName) => {
        let pattern = chordList.filter(x => x.name === chordName);
        pattern = pattern[0].pattern;
        console.log("PATTERN", pattern)
        let frets = fretArray(pattern);
        let maxFret = Math.max(...frets);
        let strings = stringArray(pattern);
        let distanceFrets = disFrets(frets);
        let distanceStrings = disStrings(strings);
        if (maxFret > 3) {
        return distanceFrets + distanceStrings + (maxFret - 3);
        } else {
            return distanceFrets + distanceStrings;
        }
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

    const interComplexity2chords = (chordList, chord1, chord2) => {
        const fingerArray1 = createFingerArray(chordList, chord1)
        const fingerArray2 = createFingerArray(chordList, chord2)
        let interDistance = 0;
        for (let i=0; i<4; i++) {
            if(fingerArray1[i] < 0 || fingerArray2[i] < 0){
                if (fingerArray2[i] < 0 && fingerArray1[i] < 0) {
                    interDistance = interDistance + Math.abs(fingerArray2[i] - fingerArray1[i])
                } else if (fingerArray1[i] < 0){
                    interDistance = interDistance + Math.abs(fingerArray2[i])
                } else {
                    interDistance = interDistance + Math.abs(fingerArray1[i])
                }
            } else {
                interDistance = interDistance + Math.abs(fingerArray2[i] - fingerArray1[i])
            }

        }
        return interDistance;
    }

    /**
     * Complessità
     * @param chordList
     * @param chord1
     * @param chord2
     * @returns {number}
     */
    const globalComplexity = (chordList, chord1, chord2) => {
        let intra1 = intraComplexity(chordList, chord1);
        let intra2 = intraComplexity(chordList, chord2);
        let inter = interComplexity2chords (chordList, chord1, chord2)

        console.log("Intra of ", chord1, "is", intra1);
        console.log("Intra of ", chord2, "is", intra2);
        console.log("Inter of ", chord1, chord2, "is", inter);

        return intra1 + intra2 + inter;
    }


    return useMemo(
        () => ({
            chordList,
            functions: {
                fretArray: fretArray,
                stringArray: stringArray,
                disStrings: disStrings,
                disFrets: disFrets,
                intraComplexity: intraComplexity,
                createFingerArray: createFingerArray,
                interComplexity2chords: interComplexity2chords,
                globalComplexity: globalComplexity,
                defineSelectedChords: defineSelectedChords,
            },

            sequenceChords:{
                data: chordsArray,
                setData: setChordsArray,
            }

        }), [chordsArray]
    );

}

