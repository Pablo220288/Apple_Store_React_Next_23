import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext({});

export function FavoriteContexProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (favoriteProducts?.length > 0) {
      ls?.setItem("favorite", JSON.stringify(favoriteProducts));
    }
  }, [favoriteProducts]);

  useEffect(() => {
    if (ls && ls.getItem("favorite")) {
      setFavoriteProducts(JSON.parse(ls.getItem("favorite")));
    }
  }, []);

  const handlerFavoriteProduct = (isChecked, productId) => {
    if (isChecked === true) {
      setFavoriteProducts((prev) => [...prev, productId]);
    } else if (favoriteProducts.length === 1) {
      setFavoriteProducts([]);
      ls?.removeItem("favorite")
    } else {
      setFavoriteProducts((prev) => {
        const pos = prev.indexOf(productId);
        if (pos !== -1) {
          return prev.filter((value, index) => index !== pos);
        }
        return prev;
      });
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteProducts, handlerFavoriteProduct }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
