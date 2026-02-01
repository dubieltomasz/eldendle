import { motion, AnimatePresence } from 'framer-motion';
import type { Record } from './routes/WeaponGuesser';
import '../styles/ListGuesses.css';

interface Prop {
    guesses: Record[];
    todaysEldendle: Record;
    showDamage: boolean;
    showDamageNegation: boolean;
    showScaling: boolean;
};

function StatusEffect(value: number): string {
    switch (value) {
        case 0:
            return 'None';
        case 1:
            return 'Cold';
        case 2:
            return 'Bloodloss';
        case 3:
            return 'Poison';
        case 4:
            return 'Scarlet Rot';
        case 5:
            return 'Sleep';
        case 6:
            return 'Madness';
        default:
            return 'Deathblight'
    }
}

function showHint(actual: number, expected: number): string {
    return actual !== expected ? actual < expected ? ' ↑' : ' ↓' : '';
}

function match(actual: number, expected: number): string {
    return actual === expected ? 'good' : 'veryWrong';
}

function matchMultiple(values: number[]): string {
    let good: boolean = false;
    let bad: boolean = false;

    for (let i = 0; i < values.length - 1; i += 2) {
        if ((values[i] !== 0) === (values[i + 1] !== 0)) {
            good = true;
        } else {
            bad = true;
        }
    }

    return good && !bad ? 'good' : good ? 'wrong' : 'veryWrong';
}

function matchByValues(values: number[]): string {
    let good: boolean = false;
    let bad: boolean = false;

    for (let i = 0; i < values.length - 1; i += 2) {
        if (values[i] === values[i + 1]) {
            good = true;
        } else {
            bad = true;
        }
    }

    return good && !bad ? 'good' : good ? 'wrong' : 'veryWrong';
}

function ListGuesses({ guesses, todaysEldendle, showDamage, showDamageNegation, showScaling }: Prop) {
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
                        <td>Picture</td>
                        <td className={guess === todaysEldendle ? 'good' : 'veryWrong'}>
                            {guess.name}
                        </td>
                        <td className={guess.wepType === todaysEldendle.wepType ? 'good' : 'veryWrong'}>
                            {guess.wepType}
                        </td>
                        <td className={matchMultiple([guess.attackPhy, todaysEldendle.attackPhy, guess.attackMag, todaysEldendle.attackMag, guess.attackFir, todaysEldendle.attackFir, guess.attackLig, todaysEldendle.attackLig, guess.attackHol, todaysEldendle.attackHol])}>
                            {guess.attackPhy ? <p>Phy{showDamage ? ' ' + guess.attackPhy + showHint(guess.attackPhy, todaysEldendle.attackPhy) : ''}</p> : ''}
                            {guess.attackMag ? <p>Mag{showDamage ? ' ' + guess.attackMag + showHint(guess.attackMag, todaysEldendle.attackMag) : ''}</p> : ''}
                            {guess.attackFir ? <p>Fir{showDamage ? ' ' + guess.attackFir + showHint(guess.attackFir, todaysEldendle.attackFir) : ''}</p> : ''}
                            {guess.attackLig ? <p>Lig{showDamage ? ' ' + guess.attackLig + showHint(guess.attackLig, todaysEldendle.attackLig) : ''}</p> : ''}
                            {guess.attackHol ? <p>Hol{showDamage ? ' ' + guess.attackHol + showHint(guess.attackHol, todaysEldendle.attackHol) : ''}</p> : ''}
                        </td>
                        {showDamageNegation ?
                            <td className={matchByValues([guess.guardPhy, todaysEldendle.guardPhy, guess.guardMag, todaysEldendle.guardMag, guess.guardFire, todaysEldendle.guardFire, guess.guardLig, todaysEldendle.guardLig, guess.guardHol, todaysEldendle.guardHol])}>
                                {guess.guardPhy ? <p>Phy {guess.guardPhy + showHint(guess.guardPhy, todaysEldendle.guardPhy)}</p> : ''}
                                {guess.guardMag ? <p>Mag {guess.guardMag + showHint(guess.guardMag, todaysEldendle.guardMag)}</p> : ''}
                                {guess.guardFire ? <p>Fir {guess.guardFire + showHint(guess.guardFire, todaysEldendle.guardFire)}</p> : ''}
                                {guess.guardLig ? <p>Lig {guess.guardLig + showHint(guess.guardLig, todaysEldendle.guardLig)}</p> : ''}
                                {guess.guardHol ? <p>Hol {guess.guardHol + showHint(guess.guardHol, todaysEldendle.guardHol)}</p> : ''}
                            </td>
                            : ''
                        }
                        <td className={matchMultiple([guess.reqStr, todaysEldendle.reqStr, guess.reqDex, todaysEldendle.reqDex, guess.reqInt, todaysEldendle.reqInt, guess.reqFai, todaysEldendle.reqFai, guess.reqArc, todaysEldendle.reqArc])}>
                            {guess.reqStr ? <p>Str{showScaling ? ' ' + guess.reqStr + showHint(guess.reqStr, todaysEldendle.reqStr) : ''}</p> : ''}
                            {guess.reqDex ? <p>Dex{showScaling ? ' ' + guess.reqDex + showHint(guess.reqDex, todaysEldendle.reqDex) : ''}</p> : ''}
                            {guess.reqInt ? <p>Int{showScaling ? ' ' + guess.reqInt + showHint(guess.reqInt, todaysEldendle.reqInt) : ''}</p> : ''}
                            {guess.reqFai ? <p>Fai{showScaling ? ' ' + guess.reqFai + showHint(guess.reqFai, todaysEldendle.reqFai) : ''}</p> : ''}
                            {guess.reqArc ? <p>Arc{showScaling ? ' ' + guess.reqArc + showHint(guess.reqArc, todaysEldendle.reqArc) : ''}</p> : ''}
                        </td>
                        <td className={match(guess.spEff, todaysEldendle.spEff)}>
                            {StatusEffect(guess.spEff)}
                        </td>
                        <td className={match(guess.weight, todaysEldendle.weight)}>
                            {guess.weight + showHint(guess.weight, todaysEldendle.weight)}
                        </td>
                        <td className={match(guess.upgradeStone, todaysEldendle.upgradeStone)}>
                            {guess.upgradeStone ? 'Smithing Stone' : 'Somber Smithing Stone'}
                        </td>
                    </motion.tr>
                ))}
            </AnimatePresence>
        </tbody>
    );
}

export default ListGuesses;