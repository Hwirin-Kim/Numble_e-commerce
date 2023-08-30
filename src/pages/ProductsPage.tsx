import React, { useEffect } from "react";
import styled from "styled-components";
import Product from "../components/products/Product";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { dataFetching } from "../redux/slice/productsSlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dataFetching());
  }, [dispatch]);

  const productsList = useAppSelector((state) => {
    return state.products.products;
  });

  console.log(productsList);

  return (
    <StContainer>
      <StGrid>
        {productsList.map((product) => {
          return <Product key={product.product_no} product={product} />;
        })}
      </StGrid>
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 100%;
`;

const StGrid = styled.div`
  display: grid;
  gap: 0.5rem 1rem;
  grid-template-columns: 1fr 1fr;
`;
