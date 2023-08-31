import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsArrayType } from "../../types/productTypes";

type InitialState = {
  products: ProductsArrayType;
  totalItems: number;
  itemsPerPage: number;
};

const initialState: InitialState = {
  products: [
    {
      product_no: 0,
      product_name: "",
      main_image_url: "",
      price: 0,
      prev_delivery_times: [1],
      description: "",
      available_coupon: false,
      maximum_quantity: 1,
    },
  ],
  totalItems: 0,
  itemsPerPage: 0,
};

const productsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    dataFetching: (state, action: PayloadAction<number>) => {
      const itemsPerPage = 4;
      const JSONproducts = window.localStorage.getItem("products");
      const products = JSON.parse(JSONproducts!);
      const sortedProducts = [...products].sort(
        (a, b) => a.product_no - b.product_no
      );

      const startIdx = (action.payload - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;

      state.products = sortedProducts.slice(startIdx, endIdx);
      state.totalItems = sortedProducts.length;
      state.itemsPerPage = itemsPerPage;
    },
  },
});

export const { dataFetching } = productsSlice.actions;
export default productsSlice.reducer;
