import { primaryColors } from "@/lib/Colors";
import styled, { css } from "styled-components";

export const ButtonStyled = css`
  font-size: 1rem;
  border: 0;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  text-decoration: none;
  ${(props) =>
    props.primary &&
    css`
      background-color: ${primaryColors};
      color: #ffffff;
      border: 2px solid ${primaryColors};
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  ${(props) =>
    props.box &&
    css`
      box-shadow: 0px 1px 5px #aaa;
    `}
    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
      box-shadow: 0px 1px 5px #aaa;
    `}
  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
      color: #000;
    `}
    ${(props) =>
      props.black &&
      css`
        background-color: transparent;
        color: #000;
        border: 2px solid #000;
        transition: all 0.25s;
        &:hover {
          color: #fff;
          background-color: #000;
        }
      `}
    ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #ffffff;
      border: 1px solid #ffffff;
    `};
  ${(props) =>
    props.arrow &&
    css`
      background-color: #ffffff;
      padding: 0px;
      width: 24px;
      height: 24px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          stroke: #000000;
        }
      }
    `};
  svg {
    color: #ffffff;
    width: 20px;
  }
`;

const StyledButtonPrimary = styled.button`
  ${ButtonStyled}
`;
export default function Button({ children, ...rest }) {
  return <StyledButtonPrimary {...rest}>{children}</StyledButtonPrimary>;
}
