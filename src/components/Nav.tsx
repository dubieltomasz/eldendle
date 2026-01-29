import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
    return (
        <nav>
            <Link to='/' style={{textDecoration: 'none'}}><h2>Weapon Guesser</h2></Link>
            <Link to='/bossguesser' style={{textDecoration: 'none'}}><h2>Boss Guesser</h2></Link>
            <Link to='/craftingguesser' style={{textDecoration: 'none'}}><h2>Crafting Guesser</h2></Link>
            <Link to='/' style={{textDecoration: 'none'}}><h2 className='unavailable' title='Currently unavailable'>Location Guesser</h2></Link>
        </nav>
    );
};

export default Nav;