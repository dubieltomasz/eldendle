import type { Record } from './routes/WeaponGuesser';
import '../styles/ListOptions.css';

interface Prop {
    options: Record[];
    sendGuess: (guess: Record) => void;
    showDamage: boolean;
    showDamageNegation: boolean;
    showScaling: boolean;
};

function ProperWeaponType(value: number): string {
    switch (value) {
        case 1:
            return 'dagger';
        case 3:
            return 'straight sword';
        case 5:
            return 'greatsword';
        case 7:
            return 'colossal sword';
        case 9:
            return 'curved sword';
        case 11:
            return 'curved greatsword';
        case 13:
            return 'katana';
        case 14:
            return 'twinblade';
        case 15:
            return 'thrusting sword';
        case 16:
            return 'heavy thrusting sword';
        case 17:
            return 'axe';
        case 19:
            return 'greataxe';
        case 21:
            return 'hammer';
        case 23:
            return 'greathammer';
        case 24:
            return 'flail';
        case 25:
            return 'spear';
        case 28:
            return 'greatspear';
        case 29:
            return 'halberd';
        case 31:
            return 'scythe';
        case 35:
            return 'fist';
        case 37:
            return 'claws';
        case 39:
            return 'whip';
        case 41:
            return 'colossal weapon';
        case 50:
            return 'light bow';
        case 51:
            return 'bow';
        case 53:
            return 'greatbow';
        case 55:
            return 'crossbow';
        case 56:
            return 'ballistae';
        case 57:
            return 'glintstone staff';
        case 61:
            return 'sacred seals';
        case 65:
            return 'small shield';
        case 67:
            return 'medium shield';
        case 69:
            return 'greatshield';
        case 87:
            return 'torch';
        case 88:
            return 'hand-to-hand art';
        case 89:
            return 'perfume bottle';
        case 90:
            return 'thrusting shield';
        case 91:
            return 'throwing blade';
        case 92:
            return 'backhand blade';
        case 93:
            return 'light greatsword';
        case 94:
            return 'greatkatana';
        case 95:
            return 'beast claw';
        default:
            return 'unknown'
    }
}

function ListOptions({ options, sendGuess, showDamage, showDamageNegation, showScaling }: Prop) {
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
                    {showDamageNegation ?
                        <th>Damage Negation</th>
                        : ''
                    }
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
                        <td>{ProperWeaponType(option.wepType)}</td>
                        <td>
                            {option.attackPhy !== 0 ? <p>Phy{showDamage ? ' ' + option.attackPhy : ''}</p> : ''}
                            {option.attackMag !== 0 ? <p>Mag{showDamage ? ' ' + option.attackMag : ''}</p> : ''}
                            {option.attackFir !== 0 ? <p>Fir{showDamage ? ' ' + option.attackFir : ''}</p> : ''}
                            {option.attackLig !== 0 ? <p>Lig{showDamage ? ' ' + option.attackLig : ''}</p> : ''}
                            {option.attackHol !== 0 ? <p>Hol{showDamage ? ' ' + option.attackHol : ''}</p> : ''}
                        </td>
                        {showDamageNegation ?
                            <td>
                                {option.guardPhy !== 0 ? <p>Phy{showDamage ? ' ' + option.guardPhy : ''}</p> : ''}
                                {option.guardMag !== 0 ? <p>Mag{showDamage ? ' ' + option.guardMag : ''}</p> : ''}
                                {option.guardFire !== 0 ? <p>Fir{showDamage ? ' ' + option.guardFire : ''}</p> : ''}
                                {option.guardLig !== 0 ? <p>Lig{showDamage ? ' ' + option.guardLig : ''}</p> : ''}
                                {option.guardHol !== 0 ? <p>Hol{showDamage ? ' ' + option.guardHol : ''}</p> : ''}
                            </td>
                            : ''
                        }
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
                ))}
            </tbody>
        </table>
    );
};

export default ListOptions;