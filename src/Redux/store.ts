
// import { createStore } from "redux"
import { createStore } from "redux";
import { productReducer } from "./ProductsState"

const store = createStore(productReducer);

export default store;

