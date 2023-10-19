import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: solid 1px #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
`;
export default function Input(props) {
  return <StyledInput {...props} />;
}
