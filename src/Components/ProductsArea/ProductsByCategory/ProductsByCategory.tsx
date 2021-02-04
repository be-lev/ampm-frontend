import axios from "axios";
import React, { Component } from "react";
import { categoriesDownloadedAction } from "../../../Redux/CategoriesState";
import store from "../../../Redux/store";
import CategoryModel from "../Models/CategoryModel";
// import ProductModel from "../Models/ProductsModel";
import "./ProductsByCategory.css";

interface ProductsByCategoryState {
  categories: CategoryModel[];
}

class ProductsByCategory extends Component<{}, ProductsByCategoryState> {
  public constructor(props: {}) {
    super(props);
    this.state = { categories: store.getState().categoryReducer.categories };
  }

public async categoriesId(){
    try{
        const response = await axios.get<CategoryModel[]>(
            "http://localhost:3003/api/products/categories"
          );
          const categories = response.data;
          alert(categories.map(c=>(c.categoryName)));
          return categories
    }
    catch (err) {
        console.log(err);
        alert("Error");
}}

  public async componentDidMount() {
    try {
      if (store.getState().categoryReducer.categories.length === 0) {
        console.log("Going to server....");
        const response = await axios.get<CategoryModel[]>(
          "http://localhost:3003/api/products/products-by-category/2"
        );
        const action = categoriesDownloadedAction(response.data);
        store.dispatch(action);
        this.setState({
          categories: store.getState().categoryReducer.categories,
        });
      }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  public render(): JSX.Element {
    return <div className="ProductsByCategory">
<h2>Select products by Category</h2>
    <select name="categoryName" defaultValue="0">
        <option value="">
            Select Category
        </option>
 <option value="1"></option>
    </select>
<button onClick={this.categoriesId}>click me</button>
    </div>;
    
  }
}

export default ProductsByCategory;
