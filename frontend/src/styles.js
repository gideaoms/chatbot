import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Messages = styled.div`
  padding: 10px;
  background: #e6ecf0;
  height: 500px;
  overflow-y: auto;
`;

export const Message = styled.span`
  display: block;
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  float: ${props => (props.user ? "right" : "left")};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #c9c9c9;
  width: 100%;
`;
