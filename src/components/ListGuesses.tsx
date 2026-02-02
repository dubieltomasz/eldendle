import { motion, AnimatePresence } from 'framer-motion';
import type { Record } from './routes/WeaponGuesser';

interface Prop {
    guesses: Record[];
    todaysEldendle: Record;
    showDamage: boolean;
    showDamageNegation: boolean;
    showScaling: boolean;
}

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
            return 'Deathblight';
    }
}

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

function matchMultiple(values: number[]): number {
    let good: boolean = false;
    let bad: boolean = false;

    for (let i = 0; i < values.length - 1; i += 2) {
        if ((values[i] !== 0) === (values[i + 1] !== 0)) {
            good = true;
        } else {
            bad = true;
        }
    }

    return (good && !bad ? 1 : good ? 2 : 0);
}

function matchByValues(values: number[]): number {
    let good: boolean = false;
    let bad: boolean = false;

    for (let i = 0; i < values.length - 1; i += 2) {
        if (values[i] === 0) {
            continue;
        } else if (values[i] === values[i + 1]) {
            good = true;
        } else {
            bad = true;
        }
    }

    return (good && !bad ? 1 : good ? 2 : 0);
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

function TD2(labels: string[], values: number[], check: boolean, delay: number) {
    return (
        <motion.td
            initial={{ background: 'linear-gradient(180deg, #1D1C17, #1B1914)' }}
            animate={check ?
                { background: 'linear-gradient(180deg, ' + ProperColor(matchByValues(values)) + ', #1B1914)' } :
                { background: 'linear-gradient(180deg, ' + ProperColor(matchMultiple(values)) + ', #1B1914)' }
            }
            transition={{ duration: 0.5, delay: delay }}
        >
            {values[0] ? <p>{labels[0] + (check ? ' ' + values[0] + showHint(values[0], values[1]) : '')}</p> : ''}
            {values[2] ? <p>{labels[1] + (check ? ' ' + values[2] + showHint(values[2], values[3]) : '')}</p> : ''}
            {values[4] ? <p>{labels[2] + (check ? ' ' + values[4] + showHint(values[4], values[5]) : '')}</p> : ''}
            {values[6] ? <p>{labels[3] + (check ? ' ' + values[6] + showHint(values[6], values[7]) : '')}</p> : ''}
            {values[8] ? <p>{labels[4] + (check ? ' ' + values[8] + showHint(values[8], values[9]) : '')}</p> : ''}
        </motion.td>
    );
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
                        {TD('Picture', ProperColor(guess === todaysEldendle), 0.5)}
                        {TD(guess.name, ProperColor(guess.name === todaysEldendle.name), 0.5)}
                        {TD(
                            guess.wepType,
                            ProperColor(guess.wepType === todaysEldendle.wepType),
                            1
                        )}
                        {TD2(
                            ['Phy', 'Mag', 'Fir', 'Lig', 'Hol'],
                            [
                                guess.attackPhy,
                                todaysEldendle.attackPhy,
                                guess.attackMag,
                                todaysEldendle.attackMag,
                                guess.attackFir,
                                todaysEldendle.attackFir,
                                guess.attackLig,
                                todaysEldendle.attackLig,
                                guess.attackHol,
                                todaysEldendle.attackHol
                            ],
                            showDamage,
                            1.5
                        )}
                        {showDamageNegation ? TD2(
                            ['Phy', 'Mag', 'Fir', 'Lig', 'Hol'],
                            [
                                guess.guardPhy,
                                todaysEldendle.guardPhy,
                                guess.guardMag,
                                todaysEldendle.guardMag,
                                guess.guardFire,
                                todaysEldendle.guardFire,
                                guess.guardLig,
                                todaysEldendle.guardLig,
                                guess.guardHol,
                                todaysEldendle.guardHol
                            ],
                            true,
                            2
                        ) : ''}
                        {TD2(
                            ['Str', 'Dex', 'Int', 'Fai', 'Arc'],
                            [
                                guess.reqStr,
                                todaysEldendle.reqStr,
                                guess.reqDex,
                                todaysEldendle.reqDex,
                                guess.reqInt,
                                todaysEldendle.reqInt,
                                guess.reqFai,
                                todaysEldendle.reqFai,
                                guess.reqArc,
                                todaysEldendle.reqArc
                            ],
                            showScaling,
                            2
                        )}
                        {TD(StatusEffect(guess.spEff), ProperColor(guess.spEff === todaysEldendle.spEff), 2.5)}
                        {TD(guess.weight + showHint(guess.weight, todaysEldendle.weight), ProperColor(guess.weight === todaysEldendle.weight), 3)}
                        {TD(guess.upgradeStone ? 'Smithing Stone' : 'Somber Smithing Stone', ProperColor(guess.upgradeStone === todaysEldendle.upgradeStone), 3.5)}
                    </motion.tr>
                ))}
            </AnimatePresence>
        </tbody>
    );
}

export default ListGuesses;