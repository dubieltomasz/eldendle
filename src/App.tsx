import { useState } from 'react'
import Input from './Input.tsx'
import ListOptions from './ListOptions.tsx'
import './App.css'
import ListGuesses from './ListGuesses.tsx';
import JSONArray from '../public/weaponData.json';
import image from './assets/github-mark-white.png';

function App() {
  //const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);
  const todaysEldendle : number = new Date().getDate() % JSONArray.length;

  const [lastGuessDate, setLastGuessDate] = useState<string>(
    localStorage.getItem('lastGuessDate') ? localStorage.getItem('lastGuessDate')!! : ""
  );

  const [options, setOptions] = useState<number[]>([]);

  const [guesses, setGuesses] = useState<number[]>(
    localStorage.getItem('guesses') ? JSON.parse(localStorage.getItem('guesses')!!) : []
  );

  const [showDamage, setShowingDamage] = useState<boolean>(false);
  const [showScaling, setShowingScaling] = useState<boolean>(false);

  function addGuess(guess: number) {
    setGuesses(prevGuesses => {
      const newGuesses = [...prevGuesses, guess];
      localStorage.setItem('guesses', JSON.stringify(newGuesses));
      setOptions([]);
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
      <nav>
        <a>
          <h2>Weapon Guesser</h2>
        </a>
      </nav>
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
              <th>Damage Type</th>
              <th>Critical Boost</th>
              <th>Scaling</th>
              <th>Weight</th>
              <th>Upgrade Material</th>
            </tr>
          </thead>
          <ListGuesses guesses={guesses} todaysEldendle={todaysEldendle} showDamage={showDamage} showScaling={showScaling}/>
        </table>
        <section>
          <label>Show damage type values</label>
          <input type='checkbox' name='showValues' checked={showDamage} onChange={e => {setShowingDamage(!showDamage)}}/>
          <br/>
          <label>Show attribute scaling tier</label>
          <input type='checkbox' name='showValues' checked={showScaling} onChange={e => {setShowingScaling(!showScaling)}}/>
        </section>
      </main>
      <footer>
        <p>Eldendle - 2025</p>
        <a href='https://github.com/dubieltomasz/eldendle' target='_blank'><img src={image} /></a>
      </footer>
    </>
  )
}

export default App