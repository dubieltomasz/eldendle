import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
    return (
        <nav>
            <Link to='/' className='button'>Weapon Guesser</Link>
            <Link to='/' className='button'>Boss Guesser</Link>
            <Link to='/' className='button'>Crafting Guesser</Link>
            <Link to='/' className='button'>Location Guesser</Link>
        </nav>
    );
};

export default Nav;