import type { Record } from './routes/BossGuesser';
import '../styles/ListOptions.css';

interface Prop {
    options: Record[];
    sendGuess: (guess: Record) => void;
};

function Resistances(array: number[]) {
    return (
        <td>
            {array[0] === 999 ? <p>Poison</p> : ''}
            {array[1] === 999 ? <p>Scarlet Rot</p> : ''}
            {array[2] === 999 ? <p>Hemorrhage</p> : ''}
            {array[3] === 999 ? <p>Freeze</p> : ''}
            {array[4] === 999 ? <p>Sleep</p> : ''}
            {array[5] === 999 ? <p>Madness</p> : ''}
            {array[6] === 999 ? <p>Curse</p> : ''}
        </td>
    );
};

function Weaknesses(array: number[]) {
    const minimal: number = Math.min(...array);
    const count: boolean = array.every((value) => value === minimal);

    return count ? '' : (
        <td>
            {array[0] === minimal || array[0] < 0 ? <p>Standard</p> : ''}
            {array[1] === minimal || array[1] < 0 ? <p>Slash</p> : ''}
            {array[2] === minimal || array[2] < 0 ? <p>Strike</p> : ''}
            {array[3] === minimal || array[3] < 0 ? <p>Pierce</p> : ''}
            {array[4] === minimal || array[4] < 0 ? <p>Magic</p> : ''}
            {array[5] === minimal || array[5] < 0 ? <p>Fire</p> : ''}
            {array[6] === minimal || array[6] < 0 ? <p>Lightning</p> : ''}
            {array[7] === minimal || array[7] < 0 ? <p>Holy</p> : ''}
        </td>
    );
};

function ListOptions({ options, sendGuess }: Prop) {
    return options.length == 0 ? <span></span> : (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Boss</th>
                    <th>Poise</th>
                    <th>Resistances</th>
                    <th>Weaknesses</th>
                </tr>
            </thead>
            <tbody>
                {options.map((option, index) => (
                    <tr key={index} onClick={() => sendGuess(option)} className='hoverAnim'>
                        <td>Picture</td>
                        <td>{option.name}</td>
                        <td>{option.poise}</td>
                        {Resistances([
                            option.resist_poison,
                            option.resist_rot,
                            option.resist_bloodloss,
                            option.resist_freeze,
                            option.resist_sleep,
                            option.resist_madness,
                            option.resist_curse
                        ])}
                        {Weaknesses([
                            option.standard_negation,
                            option.slash_negation,
                            option.strike_negation,
                            option.pierce_negation,
                            option.magic_negation,
                            option.fire_negation,
                            option.lightning_negation,
                            option.holy_negation,
                        ])}
                    </tr>
                ))}
            </tbody>
        </table >
    );
};

export default ListOptions;