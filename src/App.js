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
import AdminPosts from './pages/AdminPosts';
import AdminReports from './pages/AdminReports';
import Edit from './pages/EditPage';
import UpdatePassword from './pages/UpdatePassword';
import Delete from './pages/DeleteUser';
import Report from './pages/Report';
import CustomerService from './pages/CustomerService';
import CreatePost from './pages/CreatePost';

import { useEffect, useState } from 'react';

function App() {
  let tempData;
  const [loginUser, setLoginUser] = useState([]);
  const [post_list, setPost_list] = useState([]);
  const [isPostEmpty, seIsPostEmpty] = useState(true);
  const session = window.sessionStorage;
  const post_session = window.sessionStorage;
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

  useEffect(() => {
    setPost_list(tempData);
    
  }, tempData);

  function setPostList(data){
    // post_session.setItem('post_list', data);
    // console.log(post_session.getItem('post_list'));
    if(post_list != data){
      tempData = data;
    }
    console.log(tempData);
  }

  function setUser(data) {
    session.setItem('email', data.email);
    session.setItem('fname', data.fname);
    session.setItem('lname', data.lname);
    session.setItem('password', data.password);
    session.setItem('phone', data.phone);
    session.setItem('city', data.city);
    session.setItem('isLogin', true);
  }
  function updatePassword(data) {
    session.setItem('password', data.newPassword);
    console.log(session);
  }
  function updateInfo(data) {
    session.setItem('phone', data.newPhone);
    session.setItem('city', data.newCity);
    console.log(session);
  }
  function userOut() {
    session.clear();
  }

  function prepToDelete() {
    const usermail = session.getItem('email');
    return usermail;
  }

  function ResetSession() {
    session.clear();
  }

  
  return (
    <div className="App">
      <Header flag={loginUser.isLogin} />

      <Routes>
        <Route exact path="/" element={<Home setPostList={setPostList} />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/adminPosts" element={<AdminPosts />} />
        <Route exact path="/adminReports" element={<AdminReports />} />
      
        <Route exact path="/allList" element={<AllList post_list={post_list}/>} />

        <Route exact path="/buyList" element={<BuyList />} />
        <Route exact path="/sellList" element={<SellList />} />
        <Route exact path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route exact path="/logOut" element={<LogOut userOut={userOut} />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/findId" element={<FindId />} />
        <Route exact path="/findPw" element={<FindPw />} />

        <Route path='/myProfile/' element={<MyProfile userData={loginUser} />} />

        <Route
          exact
          path="/editProfile"
          element={<Edit userData={loginUser} updateInfo={updateInfo} />}
        />
        <Route
          exact
          path="/update_password"
          element={<UpdatePassword userData={loginUser} updatePassword={updatePassword} />}
        />
        <Route
          exact
          path="/deleteAccount"
          element={<Delete usermail={prepToDelete} clear={ResetSession} />}
        />
        <Route exact path="/itemDetail" element={<ItemDetail />} />
        <Route exact path="/report" element={<Report userData={loginUser} />} />
        <Route exact path="/customerService" element={<CustomerService userData={loginUser} />} />
        <Route exact path="/createPost" element={<CreatePost userData={loginUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
