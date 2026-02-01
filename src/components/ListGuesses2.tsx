import JSONarray from '../../public/craftingData.json';
import '../styles/ListGuesses2.css';

interface Prop {
    guesses: number[];
    todaysEldendle: number;
}

function ListGuesses2({ guesses, todaysEldendle }: Prop) {
    return (
        <section className='guessList'>
            {[...guesses].reverse().map((value) => (
                <div className={'guessCard' + (value === todaysEldendle ? ' good' : ' wrong')}>{JSONarray.at(value)!!.name}</div>
            ))}
        </section>
    );
};

export default ListGuesses2;