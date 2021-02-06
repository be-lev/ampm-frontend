import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { productsDownloadedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/store";
import ProductCard from "../ProductCard/ProductCard";
import ProductModel from "../Models/ProductsModel";
import CategoryModel from "../Models/CategoryModel";

interface ProductsListState {
  products: ProductModel[];
  categories: CategoryModel[];
  selectedCategory: string;
  productsByCategory: ProductModel[];
}

interface ProductsListProps {}
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
        !this.state.categories.length
      ) {
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
            const {selectedCategory} = this.state;
            this.setState({
              products: store.getState().products,
              categories,
              selectedCategory,
            });
          }
      )
      .catch((err) => console.log(err.message));
    }
  }

  public async componentDidUpdate(
    prevProps: ProductsListProps,
    prevState: ProductsListState
  ) {
    try {
      if (this.state.selectedCategory !== prevState.selectedCategory) {
        const productsByCategoryResponse = await axios.get<ProductModel[]>(
          "http://localhost:3003/api/products/products-by-category/" +
            this.state.selectedCategory);
        const productsByCategory = productsByCategoryResponse.data;
        const {selectedCategory} = this.state;
        this.setState({ productsByCategory, selectedCategory });
      }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  private selectCategoryId = async (args: SyntheticEvent) => {
    const selectedCategory = (args.target as HTMLSelectElement).value;
    await this.setState({ selectedCategory });
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
          onChange={this.selectCategoryId}
        >
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
        {this.state.productsByCategory.map((p) => (
          <ProductCard key={p.productId} singleProduct={p} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
