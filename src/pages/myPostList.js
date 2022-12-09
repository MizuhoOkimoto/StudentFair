import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import List from '../components/ItemList';
import '../components/css/Item-List.css';


const MyPostlistPage = (prop) => {
  const [list, setList] = useState([]);
  //const [loading, setLoading] = useState(false);


  // This is for edit post function
  const navigate = useNavigate();

  let temp = [];

  const email = prop.userData.email;
  useEffect(() => {
    // Mizuho modify: Get post data
    
    const getData = async () => {
      
      const res = await axios.get(`http://localhost:8080/posts/getUserPosts/${email}`);
      let { data } = res;
      console.log(res, 'RESPONSE FROM SERVER SIDE');
      setList(data.reverse());

      //setLoading(false);
    };
    getData();
  }, [email]);

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
  const editPostHandler = (e) => {
    //console.log(e, 'THIS IS e IN THE HANDLER'); => e is the post_number
    navigate('/updatePost', { state: { postNum: e } });
  };

  // Delete post
  const deletePostHandler = async (e) => {
    console.log(e, 'THIS IS e IN THE DELETE HANDLER');
    await axios.delete(`http://localhost:8080/posts/delete/${e}`);
    //setLoading(true);
    // const url = 'http://localhost:8080/posts/delete/' + e;
    // axios.post(url).then((res) => {
    //   console.log(res.data, 'THIS IS res.data');
  };

  return (
    <div>
      {console.log(list, 'THIS IS LIST OF THE ALL POST DATA')}
      {/* {loading && <Loading />} */}
      {/* {!loading && ( */}
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
              <img className="list-image" src={e.img[0]} alt="list-img" />
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
                  <Button
                    className="button"
                    color="gray"
                    onClick={() => editPostHandler(e.post_number)}
                  >
                    Edit Post
                  </Button>
                  <Button
                    className="button"
                    color="#c94c4c"
                    onClick={() => deletePostHandler(e.post_number)}
                  >
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
      {/* )} */}
    </div>
  );
};

export default MyPostlistPage;
