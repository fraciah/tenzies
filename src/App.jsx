import { useEffect, useState } from 'react'
import  TenziesText  from './components/TenziesText'
import  TenziesImpl  from './components/TenziesImpl'
import  Extras  from './components/Extras'
import './styles.css' 

function App() {
    const [wonGame, setWonGame] =  useState(false) 
    const [rolls, setRolls] = useState(0);
    const [time, setTime] = useState(0);

    //tracking best time achieved
    const [bestTime, setBestTime] = useState(() => {
      const savedBestTime = localStorage.getItem('bestTime');    //retrieve best time from local storage
      if(savedBestTime){         //if best time exists in local storage,covnert it to a number and use it as initial value for bestTime
        return Number(savedBestTime);
      }
      return null;           //else use null as the initial value for bestTime
    });

    useEffect(() => {
      if(bestTime){
        localStorage.setItem('bestTime', bestTime);
      }
    },[bestTime])

  return (
    <>
      <div className="app">
        <TenziesText/>
        <TenziesImpl wonGame={wonGame}
                     setWonGame={setWonGame}
                     setRolls={setRolls}
                     setTime={setTime}
                     setBestTime={setBestTime}/>
        <Extras rolls={rolls} 
                time={time}
                bestTime={bestTime}/>
      </div>
    </>
  )
}

export default App
