import React from "react";
import styled from "styled-components";
import { ProductType } from "../../types/productTypes";
import { deliveryTime } from "../../utils/deliveryTime";
import { formatPrice } from "../../utils/formatPrice";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const IMG_SIZE = "240px";

  return (
    <StContainer>
      <StImg src={product.main_image_url} size={IMG_SIZE} />
      <StInfoWrap>
        <StInfo bold={true} fontSize="1.5rem">
          {product.product_name}
        </StInfo>
        <StInfo fontSize="1.1rem">
          예상 배송 기간 : {deliveryTime(product.prev_delivery_times)}일
        </StInfo>
        <StInfo fontSize="1.2rem">{formatPrice(product.price)}</StInfo>
        <StInfo>
          {product.maximum_quantity ? product.maximum_quantity : 1}
        </StInfo>
        <StInfo fontSize="1.1rem">{product.description}</StInfo>
      </StInfoWrap>
    </StContainer>
  );
}

const StContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  display: flex;
`;

const StImg = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  object-fit: cover;
`;

const StInfoWrap = styled.div`
  padding: 0.5rem;
`;

const StInfo = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${(props) => props.bold && "font-weight: bold"};
  ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
  margin-bottom: 0.5rem;
`;
