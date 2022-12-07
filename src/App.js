import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllList from './pages/AllList';
import ListByCategory from './pages/ListByCategory';
import BuyList from './pages/BuyList';
import SellList from './pages/SellList';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';
import MyPostHistory from './pages/myPostList';
import ItemDetail from './pages/ItemDetail';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Admin from './pages/Admin';
import AdminPosts from './pages/AdminPosts';
import AdminReports from './pages/AdminReports';
import AboutUs from './pages/AboutUs';
import Edit from './pages/EditPage';
import UpdatePassword from './pages/UpdatePassword';
import Delete from './pages/DeleteUser';
import Report from './pages/Report';
import CustomerService from './pages/CustomerService';
import CreatePost from './pages/CreatePost';
import UploadProfilePic from './pages/UploadProfileImg';
import NotFound from './pages/NotFound';
import ReportNonLogin from './pages/ReportNonLogin';
import EditPost from './pages/EditPost';
import SearchList from './pages/SearchList';

import { useEffect, useState } from 'react';

function App() {
  let tempData;
  const [loginUser, setLoginUser] = useState([]);
  const [post_list, setPost_list] = useState([]);
  const session = window.sessionStorage;

  // Don't remove: Mizuho is using this console to find an issue
  //console.log(loginUser.isAdmin);

  useEffect(() => {
    if (session) {
      //console.log(session);
      setLoginUser({
        email: session.getItem('email'),
        fname: session.getItem('fname'),
        lname: session.getItem('lname'),
        password: session.getItem('password'),
        phone: session.getItem('phone'),
        city: session.getItem('city'),
        imgURL: session.getItem('img_url'),
        isLogin: session.getItem('isLogin'),
        isAdmin: session.getItem('isAdmin'),
      });
    }
  }, [session]);

  useEffect(() => {
    setPost_list(tempData);
  }, tempData);

  function setPostList(data) {
    if (post_list !== data) {
      tempData = data;
    }
    console.log(tempData);
  }

  function setUser(data) {
    
    if(data !== undefined){
      session.setItem('email', data.email);
      session.setItem('fname', data.fname);
      session.setItem('lname', data.lname);
      session.setItem('password', data.password);
      session.setItem('phone', data.phone);
      session.setItem('city', data.city);
      session.setItem('img_url', data.img_url);
      session.setItem('isLogin', true);
      session.setItem('isAdmin', data.admin);
    }
  }
  function updateProfilePic(url) {

    if(url !== undefined){
      session.setItem('img_url', url);
      console.log(url);
    setLoginUser({
      email: loginUser.email,
      fname: loginUser.fname,
      lname: loginUser.lname,
      password: loginUser.password,
      phone: loginUser.phone,
      city: loginUser.city,
      imgURL: session.getItem('img_url'),
      isLogin: loginUser.isLogin,
      isAdmin: loginUser.isAdmin,
    });
    }
    
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
        <Route path="*" element={<NotFound />} />
        <Route exact path="/admin" element={<Admin isAdmin={loginUser} />} />
        <Route exact path="/adminPosts" element={<AdminPosts isAdmin={loginUser} />} />
        <Route exact path="/adminReports" element={<AdminReports isAdmin={loginUser} />} />
        <Route exact path="/aboutUs" element={<AboutUs />} />

        <Route
          exact
          path="/lists"
          element={<AllList flag={loginUser.isLogin} userData={loginUser} post_list={post_list} />}
        />
        <Route
          exact
          path="/searchResult"
          element={
            <SearchList flag={loginUser.isLogin} userData={loginUser} post_list={post_list} />
          }
        />
        <Route
          exact
          path="/lists/:category"
          element={
            <ListByCategory flag={loginUser.isLogin} userData={loginUser} post_list={post_list} />
          }
        />
        <Route
          exact
          path="/lists/buy"
          element={<BuyList flag={loginUser.isLogin} userData={loginUser} />}
        />
        <Route
          exact
          path="/lists/sell"
          element={<SellList flag={loginUser.isLogin} userData={loginUser} />}
        />
        <Route path="/list/post/detail/:post" element={<ItemDetail userData={loginUser} />} />

        <Route exact path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route exact path="/logOut" element={<LogOut userOut={userOut} />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/findId" element={<FindId />} />
        <Route exact path="/findPw" element={<FindPw />} />

        <Route path="/myProfile/" element={<MyProfile userData={loginUser} setUser={setUser} />} />
        <Route
          path="/myProfile/upload_picture"
          element={<UploadProfilePic userData={loginUser} updateProfilePic={updateProfilePic} />}
        />
        <Route
          exact
          path="/myProfile/post/history"
          element={<MyPostHistory userData={loginUser} />}
        />
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
        <Route
          exact
          path="/report"
          element={<Report userData={loginUser} flag={loginUser.isLogin} />}
        />
        <Route exact path="/report_login" element={<ReportNonLogin />} />
        <Route exact path="/customerService" element={<CustomerService userData={loginUser} />} />
        <Route exact path="/createPost" element={<CreatePost userData={loginUser} />} />
        <Route exact path="/updatePost" element={<EditPost userData={loginUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
