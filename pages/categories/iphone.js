import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledBaner = styled.div`
  width: 100%;
  height: 350px;
  background: #ccc;
  overflow: hidden;
  position: relative;
  margin-bottom: 40px;
  img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BanerCenter = styled.div`
  max-width: 866px;
  height: 100%;
  margin: 0px auto;
  padding: 20px;
  position: relative;
`;

const BanerTitle = styled.div`
  color: #fff;
  font-size: 2.5rem;
  -webkit-box-reflect: below -12px linear-gradient(transparent, #ffffff51);
`;

export default function Iphone({ products }) {
  const [isProducts, setIsProducts] = useState([]);

  useEffect(() => {
    const productsByCategory = [];
    for (let prod of products) {
      if (prod.category.name === "mobile") {
        productsByCategory.push(prod);
      }
    }
    setIsProducts(productsByCategory);
  }, []);

  return (
    <>
      <Header />
      <StyledBaner>
        <img src="/assets/iphones.png" />
        <BanerCenter>
          <BanerTitle>Iphone</BanerTitle>
        </BanerCenter>
      </StyledBaner>
      <Center>
        <ProductsGrid products={isProducts} />
      </Center>
      <Footer />
    </>
  );
}

async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}).populate("category");
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
