import { CartContextProvider } from "@/components/CartContext";
import "../styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { FavoriteContexProvider } from "@/components/FavoriteContext";

const GlobalStyled = createGlobalStyle`
body{  
  padding: 0;
  margin:0;
  box-sizing:border-box;
  background-color: #eee
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyled />
      <CartContextProvider>
        <FavoriteContexProvider>
          <Component {...pageProps} />
        </FavoriteContexProvider>
      </CartContextProvider>
    </>
  );
}
