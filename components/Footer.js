import styled, { css } from "styled-components";
import { StyledLogo } from "./Header";
import Center from "./Center";
import Link from "next/link";
import Envelope from "./icons/Envelope";
import Airplane from "./icons/Airplane";
import YoutubeIcon from "./icons/Youtube";
import GithubIcon from "./icons/Github";

const StyledFooter = styled.footer`
  width: 100%;
  background: linear-gradient(to right, #00093c, #2d0b00);
  color: #ffffff;
  margin-top: 50px;
  padding: 80px 0 30px;
  border-top-left-radius: 90px;
`;

const StyledFooterRow = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;
const StyledFooterColumn = styled.div`
  width: 170px;
  padding: 10px;
  ${(props) =>
    props.link &&
    css`
      width: 100px;
    `}
  h3 {
    font-size: 1rem;
    font-style: normal;
    font-weight: normal;
    margin: 10px 0px 20px 0px;
  }
  p {
    font-size: 10px;
    margin: 0;
  }
  h4 {
    font-size: 0.8rem;
    font-style: normal;
    font-weight: normal;
    margin: 10px 0px 20px 0px;
  }
`;

const FooterSpan = styled.div`
  font-size: 10px;
  margin-top: 20px;
  margin-left: 20px;
`;

const FooterOficceEmail = styled.div`
  width: fit-content;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  margin: 20px 0px;
`;
const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;
const FooterLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 0.7rem;
`;
const FooterForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  div {
    width: 20px;
    display: flex;
    align-items: center;
  }
  input {
    all: unset;
    width: 100%;
    font-size: 10px;
    padding: 5px 5px 5px 10px;
  }
  button {
    all: unset;
    width: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const FooterSocial = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 25px;
    fill: #fff;
  }
  p {
    color: #fff;
    font-size: 1rem;
    font-family: "The Scientist", sans-serif;
    margin-left: 10px;
  }
`;

const StyledCopyright = styled.p`
  width: 100%;
  text-align: center;
  font-size: 10px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Center>
        <StyledFooterRow>
          <StyledFooterColumn>
            <StyledLogo href={"/"} footer={1}>
              <svg
                width="256px"
                height="315px"
                viewBox="0 0 256 315"
                version="1.1"
              >
                <g>
                  <path
                    d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
              <div>Ecommerce</div>
            </StyledLogo>
            <FooterSpan>
              Subscribe to DevPaul Youtube channel for more website development
              videos and hit the bell icon to get immediate notification of the
              latest videos.
            </FooterSpan>
          </StyledFooterColumn>
          <StyledFooterColumn>
            <h3>Office</h3>
            <p>Catelli Road</p>
            <p>Rio Ceballos, Cordoba</p>
            <p>Colon, CP 5111, Argentina</p>
            <FooterOficceEmail>peh_tj@hotmail.com</FooterOficceEmail>
            <h4>+54 9 351 6342315</h4>
          </StyledFooterColumn>
          <StyledFooterColumn link={1}>
            <h3>Links</h3>
            <FooterLinks>
              <FooterLink href={"/"}>Home</FooterLink>
              <FooterLink href={"/products"}>Products</FooterLink>
              <FooterLink href={"/categories"}>Categories</FooterLink>
              <FooterLink href={"/account"}>Account</FooterLink>
              <FooterLink href={"/cart"}>Cart</FooterLink>
            </FooterLinks>
          </StyledFooterColumn>
          <StyledFooterColumn>
            <h3>Newsletter</h3>
            <FooterForm>
              <div>
                <Envelope />
              </div>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">
                <Airplane />
              </button>
            </FooterForm>
            <FooterSocial>
              <Link
                href={
                  "https://www.youtube.com/channel/UCLoq-PzwGGQhrdWO5Gl-O5g"
                }
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
              <Link href={"https://github.com/Pablo220288"} t arget="_blank">
                <GithubIcon />
              </Link>
              <Link
                href={"https://pablo220288.github.io/Portafolio_2022/"}
                target="_blank"
              >
                <p>Pablo Hernandez</p>
              </Link>
            </FooterSocial>
          </StyledFooterColumn>
        </StyledFooterRow>
        <StyledCopyright>All rights reserved - 2023</StyledCopyright>
      </Center>
    </StyledFooter>
  );
};

export default Footer;
