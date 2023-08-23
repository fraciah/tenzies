import { useState } from 'react'
import { TenziesText } from './components/TenziesText'
import { TenziesImpl } from './components/TenziesImpl'
import { Extras } from './components/Extras'
import './styles.css' 

function App() {
    const [wonGame, setWonGame] =  useState(false) 
    const [rolls, setRolls] = useState(0);
    const [time, setTime] = useState(0);

  return (
    <>
      <div className="app">
        <TenziesText/>
        <TenziesImpl wonGame={wonGame}
                     setWonGame={setWonGame}
                     setRolls={setRolls}
                     setTime={setTime}/>
        <Extras rolls={rolls} 
                time={time}/>
      </div>
    </>
  )
}

export default App
