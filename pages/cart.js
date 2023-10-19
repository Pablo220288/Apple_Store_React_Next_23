import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import ArrowDown from "@/components/icons/ArrowDown";
import ArrowUp from "@/components/icons/ArrowUp";
import Input from "@/components/Input";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Link from "next/link";
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;
const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 40px;
`;
const CartTitles = styled.h2`
  font-weight: 400;
  font-size: 1.2rem;
`;
const ProductInfoCell = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  color: #000;
  text-decoration: none;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 5px;
  }
`;
const ImagesCell = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  border-radius: 10px;
  box-sizing: border-box;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;
const QuantityCell = styled.td`
  div {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 0px;
  }
  @media screen and (min-width: 768px) {
    div {
      flex-direction: row;
      gap: 5px;
    }
  }
`;
const PriceCell = styled.td`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
  }
`;
const TotalPriceCell = styled.td`
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0px;
  }
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Count = styled.span`
  width: 15px;
  text-align: center;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [successOrder, setSuccessOrder] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      clearCart();
      setSuccessOrder(true);
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };
  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  let totalPrice = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    totalPrice += price;
  }

  if (successOrder) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for you order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <CartTitles>Cart</CartTitles>
            {!cartProducts.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th prod={1}>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <ProductInfoCell href={"product/" + product._id}>
                          <ImagesCell>
                            {
                              <img
                                src={product.images[0]}
                                alt={product.title}
                              />
                            }
                          </ImagesCell>
                          {product.title}
                        </ProductInfoCell>
                      </td>
                      <QuantityCell>
                        <div>
                          <Button
                            arrow={1}
                            onClick={() => {
                              lessOfThisProduct(product._id);
                            }}
                          >
                            <div>
                              <ArrowDown />
                            </div>
                          </Button>
                          <SwitchTransition>
                            <CSSTransition
                              key={
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                              addEndListener={(node, done) =>
                                node.addEventListener(
                                  "transitionend",
                                  done,
                                  false
                                )
                              }
                              classNames="fade"
                            >
                              <Count>
                                {
                                  cartProducts.filter(
                                    (id) => id === product._id
                                  ).length
                                }
                              </Count>
                            </CSSTransition>
                          </SwitchTransition>
                          <Button
                            arrow={1}
                            onClick={() => {
                              moreOfThisProduct(product._id);
                            }}
                          >
                            <div>
                              <ArrowUp />
                            </div>
                          </Button>
                        </div>
                      </QuantityCell>
                      <PriceCell>
                        <div>
                          <SwitchTransition>
                            <CSSTransition
                              key={
                                cartProducts.filter((id) => id === product._id)
                                  .length * product.price
                              }
                              addEndListener={(node, done) =>
                                node.addEventListener(
                                  "transitionend",
                                  done,
                                  false
                                )
                              }
                              classNames="fade"
                            >
                              <span>
                                $
                                {cartProducts.filter((id) => id === product._id)
                                  .length * product.price}
                              </span>
                            </CSSTransition>
                          </SwitchTransition>
                        </div>
                      </PriceCell>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <TotalPriceCell>
                      <div>Total:</div>
                    </TotalPriceCell>
                    <PriceCell>
                      <div>
                        <SwitchTransition>
                          <CSSTransition
                            key={totalPrice}
                            addEndListener={(node, done) =>
                              node.addEventListener(
                                "transitionend",
                                done,
                                false
                              )
                            }
                            classNames="fade"
                          >
                            <span>$ {totalPrice}</span>
                          </CSSTransition>
                        </SwitchTransition>
                      </div>
                    </PriceCell>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <CartTitles>Order Information</CartTitles>
              <Input
                type="text"
                placeholder="Name"
                values={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                values={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  values={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  values={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                values={streetAddress}
                name="streetAdrress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                values={country}
                name="county"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <input
                type="hidden"
                value={cartProducts.join(",")}
                name="products"
              />
              <Button primary={1} block={1} onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
