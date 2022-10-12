import styled from 'styled-components';

const ItemBox = styled.div`
  background-color: #fff;
  padding-top: 1px;
  padding: ${(props) => {
    if (props.padding) {
      return props.padding;
    }
  }};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  min-height: 200px;
`;

export default ItemBox;
