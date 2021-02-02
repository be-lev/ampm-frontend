
import {createStore} from "redux"
import {productReducer} from "./ProductsState"

const store = createStore(productReducer);

export default store;


// If we have multiple reducers: 
// import { combineReducers, createStore } from "redux";
// const reducers = combineReducers({furnitureReducer, employeesReducer, customersReducer});
// const store = createStore(reducers);