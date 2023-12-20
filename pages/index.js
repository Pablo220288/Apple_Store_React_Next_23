import Categories from "@/components/Categories";
import { FavoriteContext } from "@/components/FavoriteContext";
import FavoriteProduct from "@/components/FavoriteProducts";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const StyledIndex = styled.div`
  position: relative;
`;

export default function HomePage({featuredProduct, newProducts}) {
  const { favoriteProducts } = useContext(FavoriteContext);

  return (
    <StyledIndex>
      <Header />
      {featuredProduct.map((product, index) => (
        <Featured product={product} key={index} />
      ))}
      {favoriteProducts?.length > 0 && (
        <FavoriteProduct products={favoriteProducts} />
      )}
      <Categories />
      <NewProduct products={newProducts} />
      <Footer />
    </StyledIndex>
  );
}

 export async function getServerSideProps() {
  await mongooseConnect();

  // Featured Product
  const featuredProductId = ["651d9f01837e7bceca303610"];
  const featuredProduct = await Product.find({ _id: featuredProductId });

  //News Products
  const newProducts = await Product.find({}, null, {
    sort: {
      _id: -1,
    },
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
} 
