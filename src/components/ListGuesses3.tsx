import { AnimatePresence, motion } from 'framer-motion';
import JSONArray from '../../public/bossData.json';

interface Prop {
    guesses: number[];
    todaysEldendle: number;
    showDamage: boolean;
    showScaling: boolean;
};

function showDifference(actual: number, expected: number): string {
    return actual !== expected ? actual < expected ? '↑' : '↓' : '';
}

function ListGuesses3({ guesses, todaysEldendle, showDamage, showScaling }: Prop) {
    return (
        <tbody>
            <AnimatePresence>
                {[...guesses].reverse().map((guess, index) => (
                    <motion.tr
                        initial={{ opacity: 0.0, y: -10 }}
                        animate={{ opacity: 1.0, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={guesses.length - 1 - index}>
                        <td>Picture</td>
                        <td className={guess === todaysEldendle ? 'good' : 'veryWrong'}>{JSONArray.at(guess)!!.name}</td>
                        <td className={JSONArray.at(guess)!!.poise === JSONArray.at(todaysEldendle)!!.poise ? 'good' : 'veryWrong'}>{JSONArray.at(guess)!!.poise}</td>
                        <td>
                            <p>Poison{showDamage ? ' ' + JSONArray.at(guess)!!.resist_poison + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_poison.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_poison.toString())) : ''}</p>
                            <p>Rot{showDamage ? ' ' + JSONArray.at(guess)!!.resist_rot + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_rot.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_rot.toString())) : ''}</p>
                            <p>Bloodloss{showDamage ? ' ' + JSONArray.at(guess)!!.resist_bloodloss + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_bloodloss.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_bloodloss.toString())) : ''}</p>
                            <p>Freeze{showDamage ? ' ' + JSONArray.at(guess)!!.resist_freeze + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_freeze.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_freeze.toString())) : ''}</p>
                            <p>Sleep{showDamage ? ' ' + JSONArray.at(guess)!!.resist_sleep + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_sleep.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_sleep.toString())) : ''}</p>
                            <p>Madness{showDamage ? ' ' + JSONArray.at(guess)!!.resist_madness + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_madness.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_madness.toString())) : ''}</p>
                            <p>Curse{showDamage ? ' ' + JSONArray.at(guess)!!.resist_curse + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_curse.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_curse.toString())) : ''}</p>
                        </td>
                        <td>
                            {JSONArray.at(guess)!!.standard_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.standard_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.standard_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.standard_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.slash_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.slash_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.slash_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.slash_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.strike_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.strike_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.strike_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.strike_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.pierce_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.pierce_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.pierce_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.pierce_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.magic_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.magic_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.magic_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.magic_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.fire_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.fire_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.fire_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.fire_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.lightning_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.lightning_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.lightning_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.lightning_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.holy_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.holy_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.holy_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.holy_negation.toString())) : ''}</p> : ''}
                        </td>
                        <td>
                            {JSONArray.at(guess)!!.standard_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.standard_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.standard_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.standard_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.slash_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.slash_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.slash_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.slash_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.strike_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.strike_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.strike_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.strike_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.pierce_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.pierce_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.pierce_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.pierce_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.magic_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.magic_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.magic_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.magic_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.fire_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.fire_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.fire_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.fire_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.lightning_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.lightning_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.lightning_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.lightning_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.holy_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.holy_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.holy_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.holy_negation.toString())) : ''}</p> : ''}
                        </td>
                    </motion.tr>
                ))}
            </AnimatePresence>
        </tbody>
    );
};

export default ListGuesses3;