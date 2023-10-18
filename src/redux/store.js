import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
  reducer: { login: loginReducer },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
