import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../components/pagination/Pagination";
import Product from "../components/products/Product";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { dataFetching } from "../redux/slice/productsSlice";

export default function ProductsPage() {
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dataFetching(page));
  }, [dispatch, page]);

  const productsList = useAppSelector((state) => {
    return state.products;
  });

  console.log(productsList);

  return (
    <StContainer>
      <StGrid>
        {productsList.products.map((product) => {
          return <Product key={product.product_no} product={product} />;
        })}
      </StGrid>
      <Pagination
        setPage={setPage}
        currentPage={page}
        totalItems={productsList.totalItems}
        itemsPerPage={productsList.itemsPerPage}
      />
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 100%;
`;

const StGrid = styled.div`
  margin: 0 auto;
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: 1fr 1fr;
`;
