import { useState } from 'react'
import { TenziesText } from './components/TenziesText'
import { TenziesImpl } from './components/TenziesImpl'
import { Extras } from './components/Extras'
import './styles.css' 

function App() {
    const [wonGame, setWonGame] =  useState(false) 
    const [rolls, setRolls] = useState(0);

  return (
    <>
      <div className="app">
        <TenziesText/>
        <TenziesImpl wonGame={wonGame}
                     setWonGame={setWonGame}
                     setRolls={setRolls}/>
        <Extras rolls={rolls} 
                setRolls={setRolls}/>
      </div>
    </>
  )
}

export default App
