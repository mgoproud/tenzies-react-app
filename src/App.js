import React from 'react';
import './App.css';
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {



  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    checkWinner(dice) && setTenzies(prevTenzies => !prevTenzies)
    if (tenzies) {
      console.log('You won!')
    }
  }, [dice])

  function checkWinner(arr) {
    return arr.every(el => el.isHeld && el.value === arr[0].value)
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {

      newDice.push(createNewDie())
    }
    return newDice
  }

  function createNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die

    })
    )
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : createNewDie()
    }))
  }

  function reset() {
    setTenzies(prevTenzies => !prevTenzies)
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />))

  return (
    <main className="App">
      <h1>Tenzies</h1>
      <h4>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
      <div className="container">
        {diceElements}
      </div>
      {tenzies ? <button className="btn" onClick={reset}>New Game</button> : <button className="btn" onClick={rollDice}>Roll</button>}
      {tenzies && <Confetti />}
    </main>
  );
}