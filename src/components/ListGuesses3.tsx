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

function showDifferenceScaling(actual: string, expected: string): string {
    return actual !== expected ? expected !== '-' ? actual < expected ? '↓' : '↑' : '↓' : '';
}

function pickRightClassWithTypes(actual: number, expected: number): string {
    let check1: number = 0, check2 = 0;

    if (JSONArray.at(actual)!!.Phy !== '-') {
        check1 |= 16;
    }
    if (JSONArray.at(actual)!!.Mag !== '-') {
        check1 |= 8;
    }
    if (JSONArray.at(actual)!!.Fir !== '-') {
        check1 |= 4;
    }
    if (JSONArray.at(actual)!!.Lit !== '-') {
        check1 |= 2;
    }
    if (JSONArray.at(actual)!!.Hol !== '-') {
        check1 |= 1;
    }
    if (JSONArray.at(expected)!!.Phy !== '-') {
        check2 |= 16;
    }
    if (JSONArray.at(expected)!!.Mag !== '-') {
        check2 |= 8;
    }
    if (JSONArray.at(expected)!!.Fir !== '-') {
        check2 |= 4;
    }
    if (JSONArray.at(expected)!!.Lit !== '-') {
        check2 |= 2;
    }
    if (JSONArray.at(expected)!!.Hol !== '-') {
        check2 |= 1;
    }

    return check1 === check2 ? 'good' : check1 & check2 ? 'wrong' : 'veryWrong';
}

function pickRightClassWithScaling(actual: number, expected: number): string {
    let check1: number = 0, check2 = 0;

    if (JSONArray.at(actual)!!.Str !== '-') {
        check1 |= 16;
    }
    if (JSONArray.at(actual)!!.Dex !== '-') {
        check1 |= 8;
    }
    if (JSONArray.at(actual)!!.Int !== '-') {
        check1 |= 4;
    }
    if (JSONArray.at(actual)!!.Fai !== '-') {
        check1 |= 2;
    }
    if (JSONArray.at(actual)!!.Arc !== '-') {
        check1 |= 1;
    }
    if (JSONArray.at(expected)!!.Str !== '-') {
        check2 |= 16;
    }
    if (JSONArray.at(expected)!!.Dex !== '-') {
        check2 |= 8;
    }
    if (JSONArray.at(expected)!!.Int !== '-') {
        check2 |= 4;
    }
    if (JSONArray.at(expected)!!.Fai !== '-') {
        check2 |= 2;
    }
    if (JSONArray.at(expected)!!.Arc !== '-') {
        check2 |= 1;
    }

    return check1 === check2 ? 'good' : check1 & check2 ? 'wrong' : 'veryWrong';
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
                        <td className={pickRightClassWithTypes(guess, todaysEldendle)}>
                            <p>Poison{showDamage ? ' ' + JSONArray.at(guess)!!.resist_poison + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_poison.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_poison.toString())) : ''}</p>
                            <p>Rot{showDamage ? ' ' + JSONArray.at(guess)!!.resist_rot + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_rot.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_rot.toString())) : ''}</p>
                            <p>Bloodloss{showDamage ? ' ' + JSONArray.at(guess)!!.resist_bloodloss + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_bloodloss.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_bloodloss.toString())) : ''}</p>
                            <p>Freeze{showDamage ? ' ' + JSONArray.at(guess)!!.resist_freeze + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_freeze.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_freeze.toString())) : ''}</p>
                            <p>Sleep{showDamage ? ' ' + JSONArray.at(guess)!!.resist_sleep + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_sleep.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_sleep.toString())) : ''}</p>
                            <p>Madness{showDamage ? ' ' + JSONArray.at(guess)!!.resist_madness + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_madness.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_madness.toString())) : ''}</p>
                            <p>Curse{showDamage ? ' ' + JSONArray.at(guess)!!.resist_curse + showDifference(Number.parseInt(JSONArray.at(guess)!!.resist_curse.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.resist_curse.toString())) : ''}</p>
                        </td>
                        <td className={pickRightClassWithScaling(guess, todaysEldendle)}>
                            {JSONArray.at(guess)!!.standard_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.standard_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.standard_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.standard_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.slash_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.slash_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.slash_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.slash_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.strike_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.strike_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.strike_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.strike_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.pierce_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.pierce_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.pierce_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.pierce_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.magic_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.magic_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.magic_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.magic_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.fire_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.fire_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.fire_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.fire_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.lightning_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.lightning_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.lightning_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.lightning_negation.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.holy_negation > 1 ? <p>Physical{showScaling ? ' ' + JSONArray.at(guess)!!.holy_negation + showDifference(Number.parseInt(JSONArray.at(guess)!!.holy_negation.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.holy_negation.toString())) : ''}</p> : ''}
                        </td>
                        <td className={pickRightClassWithScaling(guess, todaysEldendle)}>
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