import React, { useState } from "react";
import styled from "styled-components";
import { ProductType } from "../../types/productTypes";
import { deliveryTime } from "../../utils/deliveryTime";
import { formatPrice } from "../../utils/formatPrice";

import { BsCartPlus } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../UIelements/Modal";
import EditProduct from "./EditProduct";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addCart } from "../../redux/slice/cartSlice";
import { devices } from "../../styles/devices";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const IMG_SIZE = "240px";
  const dispatch = useAppDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const onClickAddCart = () => {
    dispatch(addCart({ id: product.product_no, product: product }));
  };
  return (
    <StContainer>
      <StImg src={product.main_image_url} size={IMG_SIZE} />
      <StInfoWrap>
        <StTitleWrap>
          <StInfo $bold="true" $fontSize="1.5rem">
            {product.product_name}
          </StInfo>
          <StButtonWrap>
            <BsCartPlus onClick={onClickAddCart} cursor="pointer" />
            <AiOutlineEdit onClick={() => setOnEdit(true)} cursor="pointer" />
          </StButtonWrap>
        </StTitleWrap>
        <StInfo $fontSize="1.2rem">{formatPrice(product.price)}</StInfo>
        <StInfo $fontSize="1.1rem">
          예상 배송 기간 : {deliveryTime(product.prev_delivery_times)}일
        </StInfo>

        <StInfo>
          최대 구매 수량 :{" "}
          {product.maximum_quantity ? product.maximum_quantity : 1}
        </StInfo>
        <StInfo $fontSize="1.1rem">{product.description}</StInfo>
      </StInfoWrap>
      {onEdit && (
        <Modal closeModal={() => setOnEdit(false)}>
          <EditProduct
            id={product.product_no}
            closeModal={() => setOnEdit(false)}
          />
        </Modal>
      )}
    </StContainer>
  );
}

const StContainer = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${devices.lg} {
    flex-direction: row;
    align-items: start;
  }
`;

const StImg = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  object-fit: cover;
`;

const StInfoWrap = styled.div`
  padding: 0.5rem;
  width: 100%;
`;

const StTitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StInfo = styled.p<{ $bold?: string; $fontSize?: string }>`
  ${(props) => props.$bold === "true" && "font-weight: bold"};
  ${(props) => props.$fontSize && `font-size: ${props.$fontSize}`};
  margin-bottom: 0.5rem;
`;

const StButtonWrap = styled.div`
  font-size: 1.5rem;
  width: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
