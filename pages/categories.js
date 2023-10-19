import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TitleRow = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  margin: 30px 0px 0px;
`;

const SelectorsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 50px;
`;

const SelectRow = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #ccc;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
`;
const SelectTitle = styled.span`
  font-size: 0.8rem;
  white-space: nowrap;
`;
const StyledSelect = styled.select`
  font-size: 1rem;
  border: none;
  background: transparent;
  padding: 0px 10px;
  text-align: end;
  cursor: pointer;
`;

const PropertiesRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export default function CategoryPage({ products, category }) {
  const [isProducts, setIsProduct] = useState(false);

  const [renderProducts, setRenderProducts] = useState(products);
  const [categories, setCategories] = useState("");

  const [categorySelected, setCategorySelected] = useState("");
  const [categoryProperties, setCategoryProperties] = useState([]);

  const [productsByCategory, setProductByCategory] = useState([]);

  const [propertySelected, setPropertySelected] = useState([]);

  useEffect(() => {
    setNameSetect();
  }, []);

  const setNameSetect = () => {
    const filterParent = category.filter(
      (category) => category.parent === undefined
    );
    setCategories(filterParent);
  };

  const selectedCategory = async (category) => {
    if (category === "") {
      setIsProduct(true);
      setRenderProducts(products);
      setCategoryProperties("");
      setIsProduct(false);
    } else {
      setIsProduct(true);

      await axios.get("/api/products?category=" + category).then((result) => {
        setRenderProducts(result.data);
        setProductByCategory(result.data);
      });

      const cat = categories.filter((cat) => cat._id === category);
      const properties = [];

      for (const prop of cat[0].properties) {
        properties.push({
          name: prop.name,
          value: "",
        });
      }

      setPropertySelected(properties);
      setCategoryProperties(cat[0].properties);

      setIsProduct(false);
    }
  };

  async function selectProperty(name, value) {
    const productsByProperty = [];

    if (value === "") {
      setRenderProducts(productsByCategory);
    } else {
      for (const prop of productsByCategory) {
        if (prop.properties[`${name}`] === value) {
          productsByProperty.push(prop);
        }
      }
      setRenderProducts(productsByProperty);
    }
  }

  return (
    <>
      <Header />
      <Center>
        <TitleRow>
          <Title>Categories</Title>
          {isProducts && <Spinner color={"#1e3a8a"} />}
        </TitleRow>
        <SelectorsRow>
          <SelectRow>
            <SelectTitle>Category:</SelectTitle>
            <StyledSelect
              value={categorySelected}
              onChange={(ev) => {
                setCategorySelected(ev.target.value);
                selectedCategory(ev.target.value);
              }}
            >
              <option value="">All</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name[0].toUpperCase() +
                      category.name.substring(1)}
                  </option>
                ))}
            </StyledSelect>
          </SelectRow>
          <PropertiesRow>
            {categoryProperties.length > 0 &&
              categoryProperties.map((property, index) => (
                <SelectRow key={index}>
                  <SelectTitle>
                    {property.name[0].toUpperCase() +
                      property.name.substring(1)}
                    :
                  </SelectTitle>
                  <StyledSelect
                    value={propertySelected[index].value}
                    onChange={(ev) => {
                      propertySelected[index].value = ev.target.value;
                      setPropertySelected((prev) => {
                        return [...prev];
                      });
                      selectProperty(property.name, ev.target.value);
                    }}
                  >
                    <option value="">All</option>
                    {property.values.length > 0 &&
                      property.values.map((value, index) => (
                        <option value={value} key={index}>
                          {value[0].toUpperCase() + value.substring(1)}
                        </option>
                      ))}
                  </StyledSelect>
                </SelectRow>
              ))}
          </PropertiesRow>
        </SelectorsRow>
        <ProductsGrid products={renderProducts} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const categories = await Category.find().populate("parent");

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(categories)),
    },
  };
}
