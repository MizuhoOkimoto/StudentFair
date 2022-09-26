import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllList from './pages/AllList';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/allList" element={<AllList />} />
        <Route exact path="/buyList" element={<BuyList />} />
        <Route exact path="/sellList" element={<SellList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
