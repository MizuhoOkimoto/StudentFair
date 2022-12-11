import styled from 'styled-components';

const LoadingImg = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-image: url('https://cdn.dribbble.com/users/2046015/screenshots/5973727/media/4ff4b63efa7ca092c3402f2881750a44.gif');
`;
const Loading = () => {
  return (
    <div className="text-center my-5">
      <LoadingImg />
      <span>Loading the Items...</span>
    </div>
  );
};

export default Loading;
