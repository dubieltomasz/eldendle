import type { Record } from '../routes/WeaponGuesser';
import './ListOptions.css';

interface Prop {
    options: Record[];
    sendGuess: (guess: Record) => void;
    showDamage: boolean;
    showScaling: boolean;
    guesses: number[];
};

function ListOptions({ options, sendGuess, showDamage, showScaling, guesses }: Prop) {
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

    if (options.length == 0) {
        return (<span></span>);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Weapon</th>
                    <th>Type</th>
                    <th>Damage Type</th>
                    <th>Damage Negation</th>
                    <th>Required Stats</th>
                    <th>Status Effect</th>
                    <th>Weight</th>
                    <th>Upgrade Material</th>
                </tr>
            </thead>
            <tbody>
                {options.map((option, index) => (
                    <tr key={index} onClick={() => sendGuess(option)} className='hoverAnim'>
                        <td>Picture</td>
                        <td>{option.name}</td>
                        <td>{option.wepType}</td>
                        <td>
                            {option.attackPhy !== 0 ? <p>Phy{showDamage ? ' ' + option.attackPhy : ''}</p> : ''}
                            {option.attackMag !== 0 ? <p>Mag{showDamage ? ' ' + option.attackMag : ''}</p> : ''}
                            {option.attackFir !== 0 ? <p>Fir{showDamage ? ' ' + option.attackFir : ''}</p> : ''}
                            {option.attackLig !== 0 ? <p>Lig{showDamage ? ' ' + option.attackLig : ''}</p> : ''}
                            {option.attackHol !== 0 ? <p>Hol{showDamage ? ' ' + option.attackHol : ''}</p> : ''}
                        </td>
                        <td>
                            {option.guardPhy !== 0 ? <p>Phy{showDamage ? ' ' + option.guardPhy : ''}</p> : ''}
                            {option.guardMag !== 0 ? <p>Mag{showDamage ? ' ' + option.guardMag : ''}</p> : ''}
                            {option.guardFire !== 0 ? <p>Fir{showDamage ? ' ' + option.guardFire : ''}</p> : ''}
                            {option.guardLig !== 0 ? <p>Lig{showDamage ? ' ' + option.guardLig : ''}</p> : ''}
                            {option.guardHol !== 0 ? <p>Hol{showDamage ? ' ' + option.guardHol : ''}</p> : ''}
                        </td>
                        <td>
                            {option.reqStr !== 0 ? <p>Str{showScaling ? ' ' + option.reqStr : ''}</p> : ''}
                            {option.reqDex !== 0 ? <p>Dex{showScaling ? ' ' + option.reqDex : ''}</p> : ''}
                            {option.reqInt !== 0 ? <p>Int{showScaling ? ' ' + option.reqInt : ''}</p> : ''}
                            {option.reqFai !== 0 ? <p>Fai{showScaling ? ' ' + option.reqFai : ''}</p> : ''}
                            {option.reqArc !== 0 ? <p>Arc{showScaling ? ' ' + option.reqArc : ''}</p> : ''}
                        </td>
                        <td>
                            {option.spEff !== 0 ? <p>{StatusEffect(option.spEff)}</p> : ''}
                        </td>
                        <td>{option.weight}</td>
                        <td>{option.upgradeStone ? 'Smithing Stone' : 'Somber Smithing Stone'}</td>
                    </tr>
                ))};
            </tbody>
        </table>
    );
}

export default ListOptions;