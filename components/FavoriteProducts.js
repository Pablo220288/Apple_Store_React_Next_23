import styled from "styled-components";
import Carousel from "react-multi-carousel";
import Center from "./Center";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import ProductBox from "./ProductBox";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import CustomDot from "./CustomDots";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin: 30px 0px 20px;
`;

export default function FavoriteProduct({ products }) {
  const [isProducts, setIsProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      axios.post("/api/cart", { ids: products }).then((response) => {
        setIsProducts(response.data);
      });
    } else {
      setIsProducts([]);
    }
  }, [products]);

  const responsive = {
    desktop: {
      breakpoint: { max: 1024, min: 865 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 865, min: 569 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 569, min: 0 },
      items: 1,
    },
  };

  return (
    <Center>
      <Title>Favorites</Title>

      <Carousel
        containerClass="carousel-container"
        itemClass="carousel-item"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customDot={<CustomDot items={isProducts} />}
        responsive={responsive}
        partialVisible={true}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
      >
        {isProducts.map((product) => (
          <ProductBox {...product} key={product._id} />
        ))}
      </Carousel>
    </Center>
  );
}
