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
import ItemDetail from './pages/ItemDetail';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';

import { useState } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState([]);
  //const [password, setPassword] = useState('');

  function setUser(data, password) {
    setLoginUser(data);
    //setPassword(password);
    console.log('working' + data);
  }
  console.log('working' + loginUser);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/allList" element={<AllList />} />
        <Route exact path="/buyList" element={<BuyList />} />
        <Route exact path="/sellList" element={<SellList />} />
        <Route exact path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/findId" element={<FindId />} />
        <Route exact path="/findPw" element={<FindPw />} />
        <Route
          exact
          path="/myProfile"
          element={<MyProfile userData={loginUser.email !== '' ? loginUser : false} />}
        />
        <Route exact path="/itemDetail" element={<ItemDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
