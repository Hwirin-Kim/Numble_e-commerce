import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import productsSlice from "../slice/productsSlice";

const store = configureStore({
  reducer: { products: productsSlice, cart: cartSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
