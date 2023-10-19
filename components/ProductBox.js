import styled, { keyframes } from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FavoriteContext } from "./FavoriteContext";

const entenceBox = keyframes`
  0% {
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
`;

const ProductWrapper = styled.div`
  position: relative;
  width: 250px;
  animation: ${entenceBox} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const WhiteBox = styled(Link)`
  background-color: #ffffff;
  height: 150px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 150px;
    transition: 0.3s;
  }
  &:hover{
    img{
      transform: scale(1.05);
    }
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  font-weigth: normal;
  font-size: 0.8rem;
  color: #333333;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
  padding: 0px 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const Price = styled.div`
  font-size: 1.5rem;
`;

export default function ProductBox({ _id, title, description, images, price }) {
  const url = "product/" + _id;

  const { addProduct } = useContext(CartContext);
  const { favoriteProducts, handlerFavoriteProduct, isChecked } =
    useContext(FavoriteContext);

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            primary={1}
            box={1}
            onClick={() => {
              addProduct(_id);
            }}
          >
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
      <label className="like">
        {favoriteProducts.includes(_id) ? (
          <input
            class="hearthButton"
            checked
            type="checkbox"
            onChange={(ev) => {
              handlerFavoriteProduct(ev.target.checked, _id);
            }}
          />
        ) : (
          <input
            className="hearthButton"
            type="checkbox"
            onChange={(ev) => {
              handlerFavoriteProduct(ev.target.checked, _id);
            }}
          />
        )}
        <div className="hearth"></div>
      </label>
    </ProductWrapper>
  );
}
