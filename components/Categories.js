import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";

const StyledBoxes = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 500px;
  transition: 0.25s;
  cursor: pointer;
  margin-top: 40px;
  &:hover .box {
    filter: grayscale(1);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const StyledBox = styled(Link)`
  position: relative;
  background-image: url("${(props) => props.dataimg}");
  background-position: center;
  background-size: cover;
  transition: 0.25s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &:hover {
    filter: grayscale(0) !important;
  }
  &:before {
    content: "${(props) => props.datatext}";
    position: absolute;
    bottom: -100px;
    color: #fff;
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    transition: 0.5s;
    opacity: 0;
    transition-delay: 0s;
    -webkit-box-reflect: below -12px linear-gradient(transparent, #ffffff51);
  }
`;
export default function Categories() {
  return (
    <Center>
      <StyledBoxes className="containerBox">
        <StyledBox
          className="box one"
          datatext="Iphone"
          dataimg={"/assets/iphones.png"}
          href={"/iphone"}
        ></StyledBox>
        <StyledBox
          className="box two"
          datatext="Macbook"
          dataimg={"/assets/macbooks.png"}
          href={"/macbook"}
        ></StyledBox>
        <StyledBox
          className="box three"
          datatext="Apple Watch"
          dataimg={"/assets/applewatch.png"}
          href={"/applewatch"}
        ></StyledBox>
        <StyledBox
          className="box four"
          datatext="AirPods"
          dataimg={"/assets/airpods.png"}
          href={"/airpods"}
        ></StyledBox>
      </StyledBoxes>
    </Center>
  );
}
