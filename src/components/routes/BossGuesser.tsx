import JSONArray from '../../../public/bossData.json';
import { TodaysEldendle } from '../randomizer';
import { useState } from 'react';
import Input from '../Input';
import ListOptions3 from '../ListOptions3';
import ListGuesses3 from '../ListGuesses3';

export interface Record {
    name: string;
    hp: number;
    poise: number;
    resist_poison: number;
    resist_rot: number;
    resist_bloodloss: number;
    resist_freeze: number;
    resist_sleep: number;
    resist_madness: number;
    resist_curse: number;
    standard_negation: number;
    slash_negation: number;
    strike_negation: number;
    pierce_negation: number;
    magic_negation: number;
    fire_negation: number;
    lightning_negation: number;
    holy_negation: number;
};

function BossGuesser() {
    //const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);
    const todaysEldendle: number = TodaysEldendle(JSONArray.length);

    const [lastGuessDate, setLastGuessDate] = useState<string>(
        localStorage.getItem('lastGuessDate2') ? localStorage.getItem('lastGuessDate2')!! : ''
    );

    const currentDate: string = new Date().toISOString().split('T')[0];

    const [options, setOptions] = useState<number[]>([]);
    const [guesses, setGuesses] = useState<number[]>(
        localStorage.getItem('guesses2') ? JSON.parse(localStorage.getItem('guesses2')!!) : []
    );

    if (lastGuessDate === '' || lastGuessDate < currentDate) {
        localStorage.setItem('lastGuessDate2', currentDate);
        setLastGuessDate(currentDate);
        localStorage.setItem('guesses2', '[]');
        setGuesses([]);
    }

    function addGuess(guess: Record) {
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses, JSONArray.indexOf(guess)];
            localStorage.setItem('guesses2', JSON.stringify(newGuesses));
            setOptions([]);
            return newGuesses;
        });

        if (JSONArray.indexOf(guess) === todaysEldendle) {
            alert('You won!!!');
        }
    };

    function search(inputValue: string) {
        const matches: number[] = [];

        JSONArray.forEach((record, index: number) => {
            if (record.name.toLocaleLowerCase().match(inputValue)) {
                matches.push(index);
            }
        })

        setOptions(matches);
    };

    return (
        <main>
            <section className='inputSection'>
                <Input search={search} />
                <ListOptions3
                    options={JSONArray.filter((_, index) => options.includes(index) && !guesses.includes(index))}
                    sendGuess={addGuess}
                />
            </section>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Boss</th>
                        <th>Poise</th>
                        <th>Resistances</th>
                        <th>Weaknesses</th>
                    </tr>
                </thead>
                <ListGuesses3
                    guesses={guesses.map(i => JSONArray.at(i)!)}
                    todaysEldendle={JSONArray.at(todaysEldendle)!}

                />
            </table>
        </main>
    );
};

export default BossGuesser;