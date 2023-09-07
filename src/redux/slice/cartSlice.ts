import { ProductsArrayType, ProductType } from "./../../types/productTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  cart?: ProductsArrayType;
};

const initialState: InitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
      _,
      action: PayloadAction<{ id: number; product: ProductType }>
    ) => {
      const { id, product } = action.payload;
      let cartArr = [];
      let isExist = false;
      const localCart = window.localStorage.getItem("cart");
      if (localCart) {
        cartArr = JSON.parse(localCart);
      }
      cartArr.forEach((product: ProductType) => {
        if (product.product_no === id) isExist = true;
      });
      if (isExist) {
        alert("이미 추가된 상품입니다.");
        return;
      }
      cartArr.push(product);
      window.localStorage.setItem("cart", JSON.stringify(cartArr));
      alert("장바구니에 추가되었습니다.");
    },
  },
});
export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
