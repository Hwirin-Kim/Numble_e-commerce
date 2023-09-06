import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsArrayType, ProductType } from "../../types/productTypes";

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
  name: "products",
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
    productEdit: (
      state,
      action: PayloadAction<{ id: number; product: ProductType }>
    ) => {
      const { id, product } = action.payload;

      //스토어 데이터 변경
      state.products = state.products.map((existingProduct) =>
        existingProduct.product_no === id
          ? { ...existingProduct, ...product }
          : existingProduct
      );

      //로컬스토리지 데이터 변경
      const JSONproducts = window.localStorage.getItem("products");

      if (JSONproducts) {
        const parsedProducts = JSON.parse(JSONproducts);
        const updatedProducts = parsedProducts.map(
          (localProduct: ProductType) =>
            localProduct.product_no === id
              ? { ...localProduct, ...product }
              : localProduct
        );
        window.localStorage.setItem(
          "products",
          JSON.stringify(updatedProducts)
        );
      }
    },
  },
});

export const { dataFetching, productEdit } = productsSlice.actions;
export default productsSlice.reducer;
