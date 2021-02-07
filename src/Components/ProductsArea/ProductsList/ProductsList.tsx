import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { productsDownloadedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/store";
import ProductCard from "../ProductCard/ProductCard";
import ProductModel from "../Models/ProductsModel";
import CategoryModel from "../Models/CategoryModel";

interface ProductsListProps{}
interface ProductsListState {
  products: ProductModel[];
  categories: CategoryModel[];
  selectedCategory: string;
  productsByCategory: ProductModel[];
}
class ProductsList extends Component<{}, ProductsListState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      products: store.getState().products,
      categories: [],
      selectedCategory: "0",
      productsByCategory: [],
    };
  }

  public async componentDidMount() {
    if (!store.getState().products.length ||
        !this.state.categories.length){
    Promise.all([
      axios.get<ProductModel[]>("http://localhost:3003/api/products"),
      axios.get<CategoryModel[]>("http://localhost:3003/api/products/categories")
    ]).then(
        ([productsResponse, CategoryResponse]) => {
            const productsAction = productsDownloadedAction(
              productsResponse.data
            );
            store.dispatch(productsAction);
            const categories = CategoryResponse.data;
            this.setState({
              products: store.getState().products,
              categories 
            });
          }
      )
      .catch((err) => console.log(err.message));
    }
  }

  public async componentDidUpdate(prevProps:ProductsListProps, prevState:ProductsListState){
    if(this.state.selectedCategory !== prevState.selectedCategory){
    try {
        const productsByCategoryResponse = await axios.get<ProductModel[]>(
          "http://localhost:3003/api/products/products-by-category/" +
            this.state.selectedCategory);
        const productsByCategory = productsByCategoryResponse.data;
        this.setState({ productsByCategory });
    } 
      catch (err) {
      console.log(err);
      alert("Error");
    }
}
  }

  private handleSelectedCategory = async (args: SyntheticEvent) => {
    const selectedCategory = (args.target as HTMLSelectElement).value;
    await this.setState({ selectedCategory });
  };

  public render(): JSX.Element {
    let productsToShow = [];
    if(this.state.selectedCategory !== "0" ){
        productsToShow = this.state.productsByCategory;
    } else {
        productsToShow = this.state.products;
    }
    return (
      <div className="ProductsList">
        <h2>Products list</h2>
        <label>Select products by category: </label>
        <select
          name="categoryName"
          defaultValue="0"
          onChange={this.handleSelectedCategory}>
          <option value="0">
            All products
          </option>
          {this.state.categories.map((c) => (
            <option key={c.categoryId} value={c.categoryName}>
              {c.categoryName}
            </option>
          ))}
        </select>
        <br/>

        {productsToShow.map((p) => (
          <ProductCard key={p.productId} singleProduct={p} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
