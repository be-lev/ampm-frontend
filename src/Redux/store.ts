
// import { createStore } from "redux"
import { combineReducers, createStore } from "redux";
import { productReducer } from "./ProductsState"
import { categoryReducer } from "./CategoriesState"

// const reducers = combineReducers({productReducer, categoryReducer});
// const store = createStore(reducers);
const store = createStore(productReducer);

export default store;


// If we have multiple reducers: 
// import { combineReducers, createStore } from "redux";
// const reducers = combineReducers({productReducer, categoryReducer});
// const store = createStore(reducers);