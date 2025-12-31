import { motion, AnimatePresence } from 'framer-motion';
import JSONArray from '../../public/weaponData.json';
import './ListGuesses.css';

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

    if(JSONArray.at(actual)!!.Phy !== '-') {
        check1 |= 16;
    }
    if(JSONArray.at(actual)!!.Mag !== '-') {
        check1 |= 8;
    }
    if(JSONArray.at(actual)!!.Fir !== '-') {
        check1 |= 4;
    }
    if(JSONArray.at(actual)!!.Lit !== '-') {
        check1 |= 2;
    }
    if(JSONArray.at(actual)!!.Hol !== '-') {
        check1 |= 1;
    }
    if(JSONArray.at(expected)!!.Phy !== '-') {
        check2 |= 16;
    }
    if(JSONArray.at(expected)!!.Mag !== '-') {
        check2 |= 8;
    }
    if(JSONArray.at(expected)!!.Fir !== '-') {
        check2 |= 4;
    }
    if(JSONArray.at(expected)!!.Lit !== '-') {
        check2 |= 2;
    }
    if(JSONArray.at(expected)!!.Hol !== '-') {
        check2 |= 1;
    }

    return check1 === check2 ? 'good' : check1 & check2 ? 'wrong' : 'veryWrong';
}

function pickRightClassWithScaling(actual: number, expected: number): string {
    let check1: number = 0, check2 = 0;

    if(JSONArray.at(actual)!!.Str !== '-') {
        check1 |= 16;
    }
    if(JSONArray.at(actual)!!.Dex !== '-') {
        check1 |= 8;
    }
    if(JSONArray.at(actual)!!.Int !== '-') {
        check1 |= 4;
    }
    if(JSONArray.at(actual)!!.Fai !== '-') {
        check1 |= 2;
    }
    if(JSONArray.at(actual)!!.Arc !== '-') {
        check1 |= 1;
    }
    if(JSONArray.at(expected)!!.Str !== '-') {
        check2 |= 16;
    }
    if(JSONArray.at(expected)!!.Dex !== '-') {
        check2 |= 8;
    }
    if(JSONArray.at(expected)!!.Int !== '-') {
        check2 |= 4;
    }
    if(JSONArray.at(expected)!!.Fai !== '-') {
        check2 |= 2;
    }
    if(JSONArray.at(expected)!!.Arc !== '-') {
        check2 |= 1;
    }

    return check1 === check2 ? 'good' : check1 & check2 ? 'wrong' : 'veryWrong';
}

function ListGuesses({ guesses, todaysEldendle, showDamage, showScaling }: Prop) {
    return (
        <tbody>
            <AnimatePresence>
                {[...guesses].reverse().map((guess, index) => (
                    <motion.tr
                        initial={{opacity: 0.0, y: -10}}
                        animate={{opacity: 1.0, y: 0}}
                        transition={{duration: 0.5}}
                        key={guesses.length - 1 - index}>
                        <td>Picture</td>
                        <td className={guess === todaysEldendle ? 'good' : 'veryWrong'}>{JSONArray.at(guess)!!.Name}</td>
                        <td className={JSONArray.at(guess)!!.Type === JSONArray.at(todaysEldendle)!!.Type ? 'good' : 'veryWrong'}>{JSONArray.at(guess)!!.Type}</td>
                        <td className={pickRightClassWithTypes(guess, todaysEldendle)}>
                            {JSONArray.at(guess)!!.Phy != '-' ? <p>Phy{showDamage ? ' ' + JSONArray.at(guess)!!.Phy + showDifference(Number.parseInt(JSONArray.at(guess)!!.Phy.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.Phy.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Mag != '-' ? <p>Mag{showDamage ? ' ' + JSONArray.at(guess)!!.Mag + showDifference(Number.parseInt(JSONArray.at(guess)!!.Mag.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.Mag.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Fir != '-' ? <p>Fir{showDamage ? ' ' + JSONArray.at(guess)!!.Fir + showDifference(Number.parseInt(JSONArray.at(guess)!!.Fir.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.Fir.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Lit != '-' ? <p>Lit{showDamage ? ' ' + JSONArray.at(guess)!!.Lit + showDifference(Number.parseInt(JSONArray.at(guess)!!.Lit.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.Lit.toString())) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Hol != '-' ? <p>Hol{showDamage ? ' ' + JSONArray.at(guess)!!.Hol + showDifference(Number.parseInt(JSONArray.at(guess)!!.Hol.toString()), Number.parseInt(JSONArray.at(todaysEldendle)!!.Hol.toString())) : ''}</p> : ''}
                        </td>
                        <td className={JSONArray.at(guess)!!.Cri === JSONArray.at(todaysEldendle)!!.Cri ? 'good' : 'veryWrong'}>
                            {JSONArray.at(guess)!!.Cri}
                            {showDifference(JSONArray.at(guess)!!.Cri, JSONArray.at(todaysEldendle)!!.Cri)}
                        </td>
                        <td className={pickRightClassWithScaling(guess, todaysEldendle)}>
                            {JSONArray.at(guess)!!.Str != '-' ? <p>Str{showScaling ? ' ' + JSONArray.at(guess)!!.Str + showDifferenceScaling(JSONArray.at(guess)!!.Str, JSONArray.at(todaysEldendle)!!.Str) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Dex != '-' ? <p>Dex{showScaling ? ' ' + JSONArray.at(guess)!!.Dex + showDifferenceScaling(JSONArray.at(guess)!!.Dex, JSONArray.at(todaysEldendle)!!.Dex) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Int != '-' ? <p>Int{showScaling ? ' ' + JSONArray.at(guess)!!.Int + showDifferenceScaling(JSONArray.at(guess)!!.Int, JSONArray.at(todaysEldendle)!!.Int) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Fai != '-' ? <p>Fai{showScaling ? ' ' + JSONArray.at(guess)!!.Fai + showDifferenceScaling(JSONArray.at(guess)!!.Fai, JSONArray.at(todaysEldendle)!!.Fai) : ''}</p> : ''}
                            {JSONArray.at(guess)!!.Arc != '-' ? <p>Arc{showScaling ? ' ' + JSONArray.at(guess)!!.Arc + showDifferenceScaling(JSONArray.at(guess)!!.Arc, JSONArray.at(todaysEldendle)!!.Arc) : ''}</p> : ''}
                        </td>
                        <td className={JSONArray.at(guess)!!.Wgt === JSONArray.at(todaysEldendle)!!.Wgt ? 'good' : 'veryWrong'}>
                            {JSONArray.at(guess)!!.Wgt}
                            {showDifference(JSONArray.at(guess)!!.Wgt, JSONArray.at(todaysEldendle)!!.Wgt)}
                        </td>
                        <td className={JSONArray.at(guess)!!.Upgrade === JSONArray.at(todaysEldendle)!!.Upgrade ? 'good' : 'veryWrong'}>{JSONArray.at(guess)!!.Upgrade}</td>
                    </motion.tr>
                ))}
            </AnimatePresence>
        </tbody>
    );
}

export default ListGuesses;