import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/slices/auth";
import messageReducer from "./redux/slices/message";
const reducer = {
  auth: authReducer,
  message: messageReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
