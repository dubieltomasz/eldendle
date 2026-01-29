import { useState } from 'react';
import Input from '../components/Input.tsx';
import ListOptions3 from '../components/ListOptions.tsx';
import ListGuesses3 from '../components/ListGuesses3.tsx';
import JSONArray from '../../public/weaponData.json';
import '../components/WeaponGuesser.css';

function BossGuesser() {
    //const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);
    const todaysEldendle: number = new Date().getDate() % JSONArray.length;

    const [lastGuessDate, setLastGuessDate] = useState<string>(
        localStorage.getItem('lastGuessDate2') ? localStorage.getItem('lastGuessDate2')!! : ''
    );

    const [options, setOptions] = useState<number[]>([]);

    const [guesses, setGuesses] = useState<number[]>(
        localStorage.getItem('guesses2') ? JSON.parse(localStorage.getItem('guesses2')!!) : []
    );

    const [showDamage, setShowingDamage] = useState<boolean>(false);
    const [showScaling, setShowingScaling] = useState<boolean>(false);

    function addGuess(guess: number) {
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses, guess];
            localStorage.setItem('guesses2', JSON.stringify(newGuesses));
            setOptions([]);
            return newGuesses;
        });

        if (guess === todaysEldendle) {
            alert('You won!!!');
        }
    }

    const currentDate: string = new Date().toISOString().split('T')[0];

    if (lastGuessDate === '' || lastGuessDate < currentDate) {
        localStorage.setItem('lastGuessDate2', currentDate);
        setLastGuessDate(currentDate);
        localStorage.setItem('guesses2', '[]');
        setGuesses([]);
    }

    return (
        <main>
            <section className='inputSection'>
                <Input search={setOptions} />
                <ListOptions3 options={options} sendGuess={addGuess} showDamage={showDamage} showScaling={showScaling} guesses={guesses} />
            </section>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Boss</th>
                        <th>HP</th>
                        <th>Runes rewarded</th>
                        <th>Poise</th>
                        <th>Resistances</th>
                        <th>Negations</th>
                    </tr>
                </thead>
            </table>
            <ListGuesses3 />
            <section className='hintSection'>
                <h3>Hints</h3>
                <input type='checkbox' name='showValues' checked={showDamage} onChange={() => { setShowingDamage(showDamage => !showDamage) }} />
                <label>Show damage type values</label>
                <br />
                <input type='checkbox' name='showValues' checked={showScaling} onChange={() => { setShowingScaling(showScaling => !showScaling) }} />
                <label>Show attribute scaling tier</label>
            </section>
        </main>
    )
}

export default BossGuesser;