import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllList from './pages/AllList';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';
import ItemDetail from './pages/ItemDetail';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Admin from './pages/Admin';


import { useEffect, useState } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState([]);
  
  const session = window.sessionStorage;
  useEffect(() => {
    if (session) {
      setLoginUser({
        email: session.getItem('email'),
        fname: session.getItem('fname'),
        lname: session.getItem('lname'),
        password: session.getItem('password'),
        phone: session.getItem('phone'),
        city: session.getItem('city'),
        isLogin: session.getItem('isLogin'),
      });
    }
    
    
  }, []);

  function setUser(data) {
    session.setItem('email', data.email);
    session.setItem('fname', data.fname);
    session.setItem('lname', data.lname);
    session.setItem('password', data.password);
    session.setItem('phone', data.phone);
    session.setItem('city', data.city);
    session.setItem('isLogin', true);
  }

  function userOut(){
    session.clear();

  }

  console.log("line 56 : " +loginUser.email);
  return (
    <div className="App">
      <Header flag={loginUser.isLogin} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/allList" element={<AllList />} />
        <Route exact path="/buyList" element={<BuyList />} />
        <Route exact path="/sellList" element={<SellList />} />
        <Route exact path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route exact path="/logOut" element={<LogOut userOut={userOut} />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/findId" element={<FindId />} />
        <Route exact path="/findPw" element={<FindPw />} />
        <Route exact path="/myProfile" element={<MyProfile userData={loginUser} />} />
        <Route exact path="/itemDetail" element={<ItemDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
