import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import WeaponGuesser from '../components/routes/WeaponGuesser';
import BossGuesser from '../components/routes/BossGuesser';
import CraftingGuesser from '../components/routes/CraftingGuesser';
import image from '../assets/github-mark-white.png';
import '../styles/App.css';

function Header() {
    return (
        <header>
            <h1>Eldendle</h1>
        </header>
    );
};

function Nav() {
    return (
        <nav>
            <Link to='/' style={{ textDecoration: 'none' }} title='Guess weapon from Elden Ring'><h2>Weapon Guesser</h2></Link>
            <Link to='/bossguesser' style={{ textDecoration: 'none' }} title='Guess boss from Elden Ring'><h2>Enemy Guesser</h2></Link>
            <Link to='/craftingguesser' style={{ textDecoration: 'none' }} title='Guess item by its crafting materials'><h2>Crafting Guesser</h2></Link>
        </nav>
    );
};

function Footer() {
    return (
        <footer>
            <p>Eldendle - 2026</p>
            <a href='https://github.com/dubieltomasz/eldendle' target='_blank'>
                <img src={image} />
            </a>
        </footer>
    );
};

function App() {
    return (
        <>
            <Header />
            <HashRouter>
                <Nav />
                <Routes>
                    <Route path='/' element={<WeaponGuesser />} />
                    <Route path='/bossguesser' element={<BossGuesser />} />
                    <Route path='/craftingguesser' element={<CraftingGuesser />} />
                </Routes>
            </HashRouter>
            <Footer />
        </>
    );
};

export default App;