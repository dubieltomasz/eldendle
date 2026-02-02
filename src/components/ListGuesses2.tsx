import { AnimatePresence, motion } from 'framer-motion';
import JSONarray from '../../public/craftingData.json';
import '../styles/ListGuesses2.css';

interface Prop {
    guesses: number[];
    todaysEldendle: number;
}

function ListGuesses2({ guesses, todaysEldendle }: Prop) {
    return (
        <AnimatePresence>
            <ul className='guessList'>
                {[...guesses].reverse().map((value, index) => (
                    <motion.li className={'guessCard' + (value === todaysEldendle ? ' good' : ' wrong')}
                        initial={{ opacity: 0.0, y: -10 }}
                        animate={{ opacity: 1.0, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={guesses.length - 1 - index}
                    >
                        {JSONarray.at(value)!!.name}
                    </motion.li>
                ))}
            </ul>
        </AnimatePresence>
    );
};

export default ListGuesses2;