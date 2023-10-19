import styled, { css } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: center;
    text-transform: uppercase;
    color: #aaaaaa;
    font-weight: 600;
    font-size: 0.7rem;
    ${(props) =>
      props.prod &&
      css`
        text-align: left;
      `}
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
