import { useState } from 'react';
import Input from '../Input.tsx';
import ListOptions2 from '../ListOptions2.tsx';
import JSONArray from '../../../public/craftingData.json';
import ListGuesses2 from '../ListGuesses2.tsx';
import '../../styles/CraftingGuesser.css';

function CraftingGuesser() {
    //const [todaysEldendle, setTodaysEldendle] = useState<number>(new Date().getDate() % JSONArray.length);
    const todaysEldendle: number = new Date().getDate() % JSONArray.length;

    const [lastGuessDate, setLastGuessDate] = useState<string>(
        localStorage.getItem('lastGuessDate3') ? localStorage.getItem('lastGuessDate3')!! : ''
    );

    const [options, setOptions] = useState<number[]>([]);

    const [guesses, setGuesses] = useState<number[]>(
        localStorage.getItem('guesses3') ? JSON.parse(localStorage.getItem('guesses3')!!) : []
    );

    function addGuess(guess: number) {
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses, guess];
            localStorage.setItem('guesses3', JSON.stringify(newGuesses));
            setOptions([]);
            return newGuesses;
        });

        if (guess === todaysEldendle) {
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

    const currentDate: string = new Date().toISOString().split('T')[0];

    if (lastGuessDate === '' || lastGuessDate < currentDate) {
        localStorage.setItem('lastGuessDate3', currentDate);
        setLastGuessDate(currentDate);
        localStorage.setItem('guesses3', '[]');
        setGuesses([]);
    }

    return (
        <main>
            <h3>Guess item by its crafting materials</h3>
            <section className='materialBox'>
                <div className='materialCard'>{guesses.length < 1 ? "Material" : JSONArray.at(todaysEldendle)!!.ingredients[0].material}</div>
                <div className='materialCard'>{guesses.length < 2 ? "Material" : JSONArray.at(todaysEldendle)!!.ingredients.length > 1 ? JSONArray.at(todaysEldendle)!!.ingredients[1].material : "None"}</div>
                <div className='materialCard'>{guesses.length < 3 ? "Material" : JSONArray.at(todaysEldendle)!!.ingredients.length > 2 ? JSONArray.at(todaysEldendle)!!.ingredients[2].material : "None"}</div>
                <div className='materialCard'>{guesses.length < 4 ? "Material" : JSONArray.at(todaysEldendle)!!.ingredients.length > 3 ? JSONArray.at(todaysEldendle)!!.ingredients[3].material : "None"}</div>
            </section>
            <section className='inputSection'>
                <Input search={search} />
                <ListOptions2 options={options} guesses={guesses} sendGuess={addGuess} />
            </section>
            <ListGuesses2 guesses={guesses} todaysEldendle={todaysEldendle}/>
        </main>
    );
};

export default CraftingGuesser;