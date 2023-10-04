import { useState,useEffect } from "react";
import Confetti from 'react-confetti'
import PropTypes from 'prop-types';

export function TenziesImpl({ wonGame, setWonGame, setRolls, setTime, setBestTime }){
    const [nos, setNos] = useState(generateRandomNos());
    const [startTime, setStartTime] = useState(null)

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
            //calculating time taken to win the game
            const timeTaken = (Date.now() - startTime) / 1000;
            setTime(timeTaken);
            setBestTime(prevBestTime => {
                if(!prevBestTime || timeTaken < prevBestTime){
                    return timeTaken;
                } 
                return prevBestTime;
             });
        }
    },[nos, setWonGame, setTime, startTime, setBestTime])

    useEffect(()=> {
        //check if the game has started and it is not won> if both are truthy
        if(startTime && !wonGame){
            //interval to update the time every second
            const intervalId = setInterval(() => {
                setTime((Date.now() - startTime) / 1000);
            },1000);
            return () => clearInterval(intervalId);
        }
    },[setTime, startTime, wonGame])

    function flipNo(e){
        let id = e.target.id;
        if(!startTime){
            setStartTime(Date.now())
        }
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
        setStartTime(null);
        setTime(0);
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
                            setRolls(prevRollCount => prevRollCount + 1);//incrementing the rolls after a click
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
    setRolls: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    setBestTime: PropTypes.func.isRequired
}