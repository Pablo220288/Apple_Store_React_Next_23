import React from "react";
import styled from "styled-components";

const StyledDots = styled.button`
  border: none;
  width: 15px;
  height: 3px;
  margin: 0px 2px;
  cursor: pointer;
`;

const CustomDot = ({ isProducts, onClick, ...rest }) => {
  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  } = rest;

  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <StyledDots
      className={active ? "dot-active" : "dot-inactive"}
      onClick={() => onClick()}
    >
      {React.Children.toArray(isProducts)[index]}
    </StyledDots>
  );
};

export default CustomDot;
