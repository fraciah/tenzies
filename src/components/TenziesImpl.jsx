import { useState,useEffect } from "react";
import Confetti from 'react-confetti'
import PropTypes from 'prop-types';

export function TenziesImpl({ wonGame, setWonGame, setRolls }){
    const [nos, setNos] = useState(generateRandomNos());

    // generating random numbers
    function generateRandomNos(){
        let newNos = []
        for(let i=0 ; i<10 ; i++){
            let no = {id :crypto.randomUUID(),
                      value: Math.floor(Math.random() * 6),
                      flipped: false
                    };
            newNos.push(no)
        }
        return newNos;
    }
    
    useEffect(() =>{
        const allFlipped = nos.every(no => no.flipped);
        const allSame = nos.every(no => no.value === nos[0].value);
        if(allFlipped && allSame){
            setWonGame(true)
        }
    },[nos, setWonGame])

    function flipNo(e){
        let id = e.target.id;
        setNos(prevNos => {
            return prevNos.map(no => {
                if(no.id === id){
                    return {...no, flipped: !no.flipped}
                }
                return no
            })
        })
    }

    // new game
    function resetGame(){
        setWonGame(false)
        setNos(generateRandomNos())
    }
    
    return(
        <>
        {wonGame && <Confetti style={{height:"100%", width:"100%"} }/>}
            <div className="tenzies-impl">
                <div className="no-container">
                    {nos.map(no => {
                        return <span className="no" 
                                     key={no.id}
                                     id={no.id}
                                     onClick={flipNo}
                                     style={{backgroundColor: no.flipped ? "black" : "azure", 
                                             color: no.flipped ? "azure" : "black"}}
                                     >
                                    {no.value}
                                </span>
                    })}
                </div>
                <button className="btn" 
                    onClick={() => {
                        if (wonGame) {
                            resetGame();
                            setRolls(0);
                        } 
                        else {  
                            setNos(prevNos => {
                                return prevNos.map(no =>{
                                    if (!no.flipped){ //if flipped property of the no object is false
                                        return {...no, value: Math.floor(Math.random() * 6)}
                                    }
                                    return no
                                })
                            });
                            setRolls(prevRollCount => prevRollCount + 1);
                        }
                    }}>
                    {wonGame? "New Game" : "Roll"}
                </button>
            </div>
        </>
    )
}
TenziesImpl.propTypes = {
    wonGame: PropTypes.bool.isRequired,
    setWonGame: PropTypes.func.isRequired,
    setRolls: PropTypes.func.isRequired
}