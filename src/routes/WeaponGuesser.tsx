import { useState } from 'react';
import Input from '../components/Input.tsx';
import ListOptions from '../components/ListOptions.tsx';
import ListGuesses from '../components/ListGuesses.tsx';
import JSONArray from '../../public/weaponData.json';
import '../components/WeaponGuesser.css';

function WeaponGuesser() {
    //const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);
    const todaysEldendle: number = new Date().getDate() % JSONArray.length;

    const [lastGuessDate, setLastGuessDate] = useState<string>(
        localStorage.getItem('lastGuessDate') ? localStorage.getItem('lastGuessDate')!! : ''
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

        if (guess === todaysEldendle) {
            alert('You won!!!');
        }
    }

    const currentDate: string = new Date().toISOString().split('T')[0];

    if (lastGuessDate === '' || lastGuessDate < currentDate) {
        localStorage.setItem('lastGuessDate', currentDate);
        setLastGuessDate(currentDate);
        localStorage.setItem('guesses', '[]');
        setGuesses([]);
    }

    return (
        <main>
            <section className='inputSection'>
                <Input search={setOptions} />
                <ListOptions options={options} sendGuess={addGuess} showDamage={showDamage} showScaling={showScaling} guesses={guesses} />
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
                <ListGuesses guesses={guesses} todaysEldendle={todaysEldendle} showDamage={showDamage} showScaling={showScaling} />
            </table>
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

export default WeaponGuesser;