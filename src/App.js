import logo from './logo.svg';
import './App.css';
import {AppContext, useAppContext} from "./context/AppContext";
import Page from "./view/Page";


function App() {
    const appData = useAppContext();
    return (
        <>
            <AppContext.Provider value={appData}>
                <div className="App">

                    <Page/>
                    {/* appData.chordList.map((x, i) => {
                        //console.log("distance strings of " + x.name, appData.functions.disStrings(appData.functions.stringArray(x.pattern)))
                        console.log("selected Chord " + x.name, appData.functions.createFingerArray(appData.chordList, x.name));

                    })*/}
                    {/*{
                        console
                        .log("interdistance " + appData.chordList[3].name, appData.chordList[5].name, appData.functions.interComplexity2chords(appData.chordList, appData.chordList[3].name, appData.chordList[5].name))
                    }
                    {console.log("globalComplexity " + appData.chordList[3].name, appData.chordList[5].name, appData.functions.globalComplexity(appData.chordList, appData.chordList[3].name, appData.chordList[5].name))}

                    {console.log("Array Chords", appData.sequenceChords.data)}
                    */}
                    {console.log("STEP", appData.play.step)}
                    {console.log("STEP SINGLE CHORD", appData.play.stepChord)}

                </div>
            </AppContext.Provider>
        </>

    );
}

export default App;
