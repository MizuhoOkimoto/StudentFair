import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import List from '../components/ItemList';
import '../components/css/Item-List.css';
import mainImg from '../img/post_pic/mac-book.avif';

const MyPostlistPage = (prop) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPost, setUserPost] = useState();

  console.log('prop : ' + prop.post_list);
  let temp = [];

  // This is for edit post function
  const navigate = useNavigate();

  const email = prop.userData.email;
  useEffect(() => {
    console.log('Component mounts');
    // Get post data
    const getData = async () => {
      const res = await axios.get(`http://localhost:8080/posts/getUserPosts/${email}`);
      let { data } = res;
      console.log(res, 'RESPONSE FROM SERVER SIDE');
      setList(data.reverse());
      setUserPost(res.data);
    };
    getData();
  }, []);

  const renderPageButton = (e) => {
    Math.ceil(list.length / 5);
    for (let i = 0; i < Math.ceil(list.length / 5); i++) {
      temp.push(i + 1);
    }
    console.log(temp);
  };

  const pageBtnClicked = (e) => {
    console.log(e);
  };

  const createBtnPressed = () => {
    window.location = '/createPost';
  };

  // Edit post
  // const editPostHandler = () => {
  //   navigate("/updatePost",  {state:{postNum:userPost.post_number}})
  // };

  // Delete post
  // const deletePostHandler = () => {
  //   console.log(userPost);
  //   const url = 'http://localhost:8080/posts/delete/' + userPost.post_number;
  //   axios.post(url).then((res) => {
  //     console.log(res.data);
  //   });
  //   axios.get(`http://localhost:8080/posts/getRecent/${prop.userData.email}`).then((res) => {
  //     console.log(res.data)
  //     setUserPost(res.data);
  //   });
  // };

  return (
    <div>
      {console.log(list)}
      {loading && <Loading />}
      {!loading && (
        <div>
          <div className="item-list-container">
            {prop.flag === 'true' ? (
              <div className="item-list-create-post-button">
                <Button onClick={createBtnPressed} className="create-button" color="tomato">
                  Create Post
                </Button>
              </div>
            ) : (
              ''
            )}

            {list.map((e) => (
              <List key={e._id}>
                <img className="list-image" src={mainImg} alt="list-img" />
                <div className="list-desces">
                  <div className="list-desc post-num">No. {e.post_number}</div>
                  <div className="list-desc postTitle">
                    <Link className="nav-link" to={'/list/post/detail/' + e.post_number}>
                      {e.post_title}
                    </Link>
                  </div>
                  <div className="list-desc state">Condition: {e.condition}</div>
                  <div className="list-desc price">Price: ${e.price}</div>
                  <div className="list-desc seller-name">Seller: {e.user_id.split('@')[0]}</div>
                  <div className="list-desc location">Location: {e.location}</div>

                  <div className="btns">
                    <Button className="button" color="gray">
                      Edit Post
                    </Button>
                    <Button className="button" color="#c94c4c">
                      Delete Post
                    </Button>
                  </div>
                </div>
              </List>
            ))}
          </div>
          <div className="item-list-page-btn-container">
            <div className="item-list-page-btn">
              <div className="page-btn">{'<'}</div>
              {renderPageButton(Math.ceil(list.length / 5))}
              {temp.map((e) => (
                <div
                  key={e}
                  onClick={() => {
                    pageBtnClicked(e);
                  }}
                  className="page-btn"
                >
                  {e}
                </div>
              ))}
              <div className="page-btn">{'>'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostlistPage;
