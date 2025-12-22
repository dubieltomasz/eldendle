import { useState } from 'react'
import Input from './Input.tsx'
import ListOptions from './ListOptions.tsx'
import './App.css'
import ListGuesses from './ListGuesses.tsx';
import JSONArray from '../public/weaponData.json';

function App() {
  const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);

  const [lastGuessDate, setLastGuessDate] = useState<string>(
    localStorage.getItem('lastGuessDate') ? localStorage.getItem('lastGuessDate')!! : ""
  );

  const [options, setOptions] = useState<number[]>([]);

  const [guesses, setGuesses] = useState<number[]>(
    localStorage.getItem('guesses') ? JSON.parse(localStorage.getItem('guesses')!!) : []
  );

  function addGuess(guess: number) {
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses, guess];
      localStorage.setItem('guesses', JSON.stringify(newGuesses));
      return newGuesses;
    });

    if(guess === todaysEldendle) {
      alert("You won!!!");
    }
  }

  const currentDate: string = new Date().toISOString().split('T')[0];

  if (lastGuessDate === "" || lastGuessDate < currentDate) {
    localStorage.setItem('lastGuessDate', currentDate);
    setLastGuessDate(currentDate);
    localStorage.setItem('guesses', "[]");
    setGuesses([]);
  }

  return (
    <>
      <header>
        <h1>Eldendle</h1>
      </header>
      <main>
        <section className='box'>
          <Input search={setOptions} />
          <ListOptions options={options} sendGuess={addGuess} />
        </section>
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
          <ListGuesses guesses={guesses} todaysEldendle={todaysEldendle}/>
        </table>
      </main>
      <footer>
        <p>Eldendle - 2025</p>
        <a href='https://github.com/dubieltomasz/eldendle' target='_blank'><img src='./src/assets/github-mark-white.png' /></a>
      </footer>
    </>
  )
}

export default App