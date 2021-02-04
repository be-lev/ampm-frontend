import axios from "axios";
import React, { Component } from "react";
import { productsDownloadedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/store";
import ProductCard from "../ProductCard/ProductCard";
import ProductModel from "../Models/ProductsModel";
import ProductsByCategory from "../ProductsByCategory/ProductsByCategory";

interface ProductsListState {
  products: ProductModel[];
}
class ProductsList extends Component<{}, ProductsListState> {
  public constructor(props: {}) {
    super(props);
    this.state = { products: store.getState().productReducer.products };
  }

  public async componentDidMount() {
    try {
      if (store.getState().productReducer.products.length === 0) {
        console.log("(Going to server...)");
        const response = await axios.get<ProductModel[]>(
          "http://localhost:3003/api/products"
        );
 
        const action = productsDownloadedAction(response.data);
        store.dispatch(action);
        this.setState({ products: store.getState().productReducer.products });
      }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  public render(): JSX.Element {
    return (
      <div className="ProductsList">
        <h2>products list</h2>
        {this.state.products.map((p) => (
          <ProductCard key={p.productId} singleProduct={p} />
        ))}
        <ProductsByCategory />
      </div>
    );
  }
}

export default ProductsList;
