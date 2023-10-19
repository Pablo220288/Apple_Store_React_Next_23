import { useState } from "react";
import styled, { css } from "styled-components";

const StyledProductImages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
const ImageButtons = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;
  margin-top: 10px;
`;
export const ImageButtonStyled = css`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border: 2px solid transparent;
  border-radius: 5px;
  opacity: 0.6;
  ${(props) =>
    props.active === "true" &&
    css`
      border: 2px solid #ccc;
      opacity: 1;
    `};
`;
const ImageButton = styled.div`
  ${ImageButtonStyled}
`;

export default function ProductImages({ images }) {
  const [activeImages, setActiveImages] = useState(images?.[0]);
  return (
    <StyledProductImages>
      <BigImage src={activeImages} />
      <ImageButtons>
        {images.map((img, index) => (
          <ImageButton
            key={index}
            active={(img === activeImages).toString()}
            onClick={() => {
              setActiveImages(images?.[index]);
            }}
          >
            <Image src={img} />
          </ImageButton>
        ))}
      </ImageButtons>
    </StyledProductImages>
  );
}
