import styled from "styled-components";

const Button = styled.button`
  color: #fff;
  background-color: ${(props) => {
    if (props.color === "primary") {
      return "#D9A200";
    }
    if (props.color === "secondary") {
      return "#002DB2";
    }
    return "#666";
  }};
  border: 0;
  padding: 4px 8px;
  border-radius: 4px;
  ${(props) => {
    if (props.margin) {
      return props.margin;
    }
    return 0;
  }};
`;

export default Button;
