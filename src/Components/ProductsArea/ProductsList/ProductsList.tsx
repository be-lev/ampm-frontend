import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { productsDownloadedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/store";
import ProductCard from "../ProductCard/ProductCard";
import ProductModel from "../Models/ProductsModel";
import CategoryModel from "../Models/CategoryModel";
import { categoriesDownloadedAction } from "../../../Redux/CategoriesState";

interface ProductsListState {
  products: ProductModel[];
  categories: CategoryModel[];
  selectedCategory: string;
}
class ProductsList extends Component<{}, ProductsListState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      products: store.getState().productReducer.products,
      categories: store.getState().categoryReducer.categories,
      selectedCategory: "",
    };
    console.log(this.state.products.map((p)=>(p.name)));
  }

  public async componentDidMount() {
    try {
      if (store.getState().productReducer.products.length === 0) {
        console.log("(Going to server...)");
        const response = await axios.get<ProductModel[]>(
          "http://localhost:3003/api/products"
        );
        const CategoryResponse = await axios.get<CategoryModel[]>(
          "http://localhost:3003/api/products/categories"
        );

        const action = productsDownloadedAction(response.data);
        store.dispatch(action);
        this.setState({ products: store.getState().productReducer.products });

        const categoryAction = categoriesDownloadedAction(CategoryResponse.data);
        store.dispatch(categoryAction);
        this.setState({ categories: store.getState().categoryReducer.categories});
    }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  private selectCategoryId = (args: SyntheticEvent) => {
    const selectedCategory = (args.target as HTMLSelectElement).value;
    this.setState({ selectedCategory });
  };

  public render(): JSX.Element {
    return (
      <div className="ProductsList">
        <h2>Products list</h2>
        {this.state.products.map((p) => (
          <ProductCard key={p.productId} singleProduct={p} />
        ))}
        <br />
        <label>Select products by </label>
        <select
          name="categoryName"
          defaultValue="0"
          onChange={this.selectCategoryId} >

          <option disabled value="0">
            Categories
          </option>

          {this.state.categories.map((c) => (
            <option key={c.categoryId} value={c.categoryName}>
              {c.categoryName}
            </option>
          ))}
        </select>
        <h3>Products by category</h3>
        {this.state.products
          .filter((c) => c.categoryName === this.state.selectedCategory)
          .map((p) => (
            <ProductCard key={p.productId} singleProduct={p} />
          ))}

      </div>
    );
  }
}

export default ProductsList;
