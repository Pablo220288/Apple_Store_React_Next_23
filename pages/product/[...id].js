import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1frr;
  gap: 40px;
  margin: 40px 0px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Price = styled.span`
  font-size: 1.5rem;
`;

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <Button
                primary={1}
                onClick={() => {
                  addProduct(product._id);
                }}
              >
                Add to cart
              </Button>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export default ProductPage

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id[0]);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
