import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllList from './pages/AllList';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/allList" element={<AllList />} />
        <Route exact path="/buyList" element={<BuyList />} />
        <Route exact path="/sellList" element={<SellList />} />
        <Route exact path="/logIn" element={<LogIn />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/myProfile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
