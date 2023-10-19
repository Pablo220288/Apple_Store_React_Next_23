import styled from "styled-components";
import ProductBox from "./ProductBox";
import Search from "./icons/Search";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  justify-items: center;
  padding: 0px 0px 30px 0px;
  @media screen and (min-width: 570px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 866px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  div:nth-child(2) {
    animation-delay: 0.2s;
  }
  div:nth-child(3) {
    animation-delay: 0.4s;
  }
  div:nth-child(4) {
    animation-delay: 0.6s;
  }
`;

const NoMatches = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  div {
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <>
      {products?.length > 0 ? (
        <StyledProductGrid>
          {products.map((product) => (
            <ProductBox {...product} key={product._id} />
          ))}
        </StyledProductGrid>
      ) : (
        <NoMatches>
          <div>
            <Search />
          </div>
          Apparently there are no matches for your search
        </NoMatches>
      )}
    </>
  );
}
