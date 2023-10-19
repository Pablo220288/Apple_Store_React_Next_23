import styled from "styled-components";

export const StyledArrow = styled.button`
  width: 40px;
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #ccc;
  transition: color 0.25s ease-in-out;
  &:hover {
    color: #000000;
  }
`;

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <StyledArrow className="arrow-left" onClick={() => onClick()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </StyledArrow>
  );
};

export default CustomLeftArrow;
