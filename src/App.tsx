import {useState, useCallback} from 'react'
import Input from './input.tsx'
import ListGuesses from './ListGuesses.tsx'
import './App.css'

function App() {
  const [guesses, setGuesses] = useState<string[]>(
    localStorage.getItem('guesses')?
    JSON.parse(localStorage.getItem('guesses')!!):[]);
  
  return (
    <>
      <Input />
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Weapon</th>
            <th>Type</th>
            <th>Damage</th>
            <th>Critical Boost</th>
            <th>Scaling</th>
            <th>Weight</th>
            <th>Upgrade Material</th>
          </tr>
        </thead>
        <ListGuesses guesses={guesses} />
      </table>
    </>
  )
}

export default App