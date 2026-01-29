import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';
import WeaponGuesser from './routes/WeaponGuesser';
import CraftingGuesser from './routes/CraftingGuesser';
import BossGuesser from './routes/BossGuesser';

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
}

export default App