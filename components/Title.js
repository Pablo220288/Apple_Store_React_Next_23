import styled from "styled-components";

const StiledTitle = styled.h1`
  font-weight: 400;
  font-size: 1.3rem;
`;

export default function Title({ children }) {
  return <StiledTitle>{children}</StiledTitle>;
}
