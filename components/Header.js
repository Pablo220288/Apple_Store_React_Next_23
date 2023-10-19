import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Hamburger from "./icons/Hamburger";

const StyledHeader = styled.header`
  background-color: #fff;
`;

export const StyledLogo = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
  svg {
    width: 30px;
    height: 30px;
  }
  ${(props) =>
    props.footer &&
    css`
      color: #fff;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const StyledNav = css`
  ${(props) =>
    props.navMobileActive
      ? `
        display:block;
        `
      : `
        display: none;
      `}
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 80px 25px 20px;
  background-color: #fff;
  z-index: 2;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 15px;
    position: static;
    padding: 0;
  }
`;

const Nav = styled.nav`
  ${StyledNav}
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaaaaa;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.25s ease-in-out;
  &:hover {
    color: #000000;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 0px;
  }
}
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 35px;
  height: 35px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);

  const [navMobileActive, setNavMobileActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <StyledLogo href={"/"}>
            <svg
              width="256px"
              height="315px"
              viewBox="0 0 256 315"
              version="1.1"
            >
              <g>
                <path
                  d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
                  fill="#000000"
                ></path>
              </g>
            </svg>
            <div>Ecommerce</div>
          </StyledLogo>
          <Nav navMobileActive={navMobileActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length})</NavLink>
          </Nav>
          <NavButton onClick={() => setNavMobileActive((prev) => !prev)}>
            <Hamburger />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
