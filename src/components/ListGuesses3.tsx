import { AnimatePresence, motion } from 'framer-motion';
import JSONArray from '../../public/bossData.json';
import type { Record } from './routes/BossGuesser';

interface Prop {
    guesses: Record[];
    todaysEldendle: Record;
};

function Resistances(array: number[]) {
    const result = [];
    if (array[0] === 999) {
        result.push('Poison');
    }
    if (array[1] === 999) {
        result.push('Scarlet Rot');
    }
    if (array[2] === 999) {
        result.push('Hemorrhage');
    }
    if (array[3] === 999) {
        result.push('Freeze');
    }
    if (array[4] === 999) {
        result.push('Sleep');
    }
    if (array[5] === 999) {
        result.push('Madness');
    }
    if (array[6] === 999) {
        result.push('Curse');
    }
    return result;
};

function Weaknesses(array: number[]) {
    const minimal: number = Math.min(...array);
    const result = [];

    if (array[0] === minimal || array[0] < 0) {
        result.push('Standard');
    }
    if (array[1] === minimal || array[1] < 0) {
        result.push('Slash');
    }
    if (array[2] === minimal || array[2] < 0) {
        result.push('Strike');
    }
    if (array[3] === minimal || array[3] < 0) {
        result.push('Pierce');
    }
    if (array[4] === minimal || array[4] < 0) {
        result.push('Magic');
    }
    if (array[5] === minimal || array[5] < 0) {
        result.push('Fire');
    }
    if (array[6] === minimal || array[6] < 0) {
        result.push('Lightning');
    }
    if (array[7] === minimal || array[7] < 0) {
        result.push('Holy');
    }
    return result;
};

function ProperColor(value: number | boolean): string {
    switch (value) {
        case false:
        case 0:
            return '#3b0505';
        case true:
        case 1:
            return '#084217';
        default:
            return '#493f0d';
    }
}

function showHint(actual: number, expected: number): string {
    return (actual !== expected ? actual < expected ? ' ↑' : ' ↓' : '');
}

function match(values1: string[], values2: string[]): number {
    if (values1.every((value) => values2.includes(value))) {
        return 1;
    } else if (values1.some((value) => values2.includes(value))) {
        return 2;
    } else {
        return 0;
    }
}

function TD(value: string | number, color: string, delay: number) {
    return (
        <motion.td
            initial={{ background: 'linear-gradient(180deg, #1D1C17, #1B1914)' }}
            animate={{ background: 'linear-gradient(180deg, ' + color + ', #1B1914)' }}
            transition={{ duration: 0.5, delay: delay }}
        >
            <p>{value}</p>
        </motion.td>
    );
}

function TD2(array: string[] | number[], color: string, delay: number) {
    return (
        <motion.td
            initial={{ background: 'linear-gradient(180deg, #1D1C17, #1B1914)' }}
            animate={{ background: 'linear-gradient(180deg, ' + color + ', #1B1914)' }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {array.map((value) =>
                <p>{value}</p>
            )}
        </motion.td>
    );
}

function ListGuesses3({ guesses, todaysEldendle }: Prop) {
    return (
        <tbody>
            <AnimatePresence>
                {[...guesses].reverse().map((guess, index) => (
                    <motion.tr
                        initial={{ opacity: 0.0, y: -10 }}
                        animate={{ opacity: 1.0, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={guesses.length - 1 - index}
                    >
                        {TD('Picture', ProperColor(guess === todaysEldendle), 0.5)}
                        {TD(guess.name, ProperColor(guess.name === todaysEldendle.name), 1)}
                        {TD(guess.poise + showHint(guess.poise, todaysEldendle.poise), ProperColor(guess.poise === todaysEldendle.poise), 1.5)}
                        {TD2(
                            Resistances([
                                guess.resist_poison,
                                guess.resist_rot,
                                guess.resist_bloodloss,
                                guess.resist_freeze,
                                guess.resist_sleep,
                                guess.resist_madness,
                                guess.resist_curse
                            ]),
                            ProperColor(match(
                                Resistances([
                                    guess.resist_poison,
                                    guess.resist_rot,
                                    guess.resist_bloodloss,
                                    guess.resist_freeze,
                                    guess.resist_sleep,
                                    guess.resist_madness,
                                    guess.resist_curse
                                ]),
                                Resistances([
                                    todaysEldendle.resist_poison,
                                    todaysEldendle.resist_rot,
                                    todaysEldendle.resist_bloodloss,
                                    todaysEldendle.resist_freeze,
                                    todaysEldendle.resist_sleep,
                                    todaysEldendle.resist_madness,
                                    todaysEldendle.resist_curse
                                ])
                            )),
                            2
                        )}
                        {TD2(
                            Weaknesses([
                                guess.standard_negation,
                                guess.slash_negation,
                                guess.strike_negation,
                                guess.pierce_negation,
                                guess.magic_negation,
                                guess.fire_negation,
                                guess.lightning_negation,
                                guess.holy_negation,
                            ]),
                            ProperColor(match(
                                Weaknesses([
                                    guess.standard_negation,
                                    guess.slash_negation,
                                    guess.strike_negation,
                                    guess.pierce_negation,
                                    guess.magic_negation,
                                    guess.fire_negation,
                                    guess.lightning_negation,
                                    guess.holy_negation,
                                ]),
                                Weaknesses([
                                    todaysEldendle.standard_negation,
                                    todaysEldendle.slash_negation,
                                    todaysEldendle.strike_negation,
                                    todaysEldendle.pierce_negation,
                                    todaysEldendle.magic_negation,
                                    todaysEldendle.fire_negation,
                                    todaysEldendle.lightning_negation,
                                    todaysEldendle.holy_negation,
                                ]))),
                            2.5
                        )}
                    </motion.tr>
                ))}
            </AnimatePresence>
        </tbody>
    );
};

export default ListGuesses3;