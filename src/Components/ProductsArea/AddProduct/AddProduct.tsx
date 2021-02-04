import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { productAddedAction } from "../../../Redux/ProductsState";
import store from "../../../Redux/store";
import ProductModel from "../Models/ProductsModel";
import CategoryModel from "../Models/CategoryModel";
import "./AddProduct.css";

function AddProducts(): JSX.Element {
  const history = useHistory();

  //TODO: change to new react format
  const categoriesStateArray = useState<CategoryModel[]>([]);
  const categories = categoriesStateArray[0];
  const setCategories = categoriesStateArray[1];

  useEffect(() => {
    (async function () {
      const response = await axios.get<CategoryModel[]>(
        "http://localhost:3003/api/products/categories"
      );
      const categories = response.data;
      setCategories(categories);
    })();
  }, []);

  const { register, handleSubmit } = useForm<ProductModel>();

  async function send(product: ProductModel) {
    try {
      const response = await axios.post<ProductModel>(
        "http://localhost:3003/api/products",
        product
      );
      const addedProduct = response.data;
      const action = productAddedAction(addedProduct);
      store.dispatch(action);
      alert(
        "Book ID: " + addedProduct.productId + "has been successfully added"
      );

      history.push("/products");
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  }

  return (
    <div className="AddProducts">
      <h2>Add a product</h2>

      <form onSubmit={handleSubmit(send)}>
        <label>Category: </label> <br />
        <select name="categoryId" defaultValue="0" ref={register}>
          <option disabled value="0">
            Select category
          </option>
          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryName}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Name:</label> <br />
        <input type="text" name="name" ref={register} />
        <br />
        <br />
        <label>Manufacture date:</label> <br />
        <input type="date" name="manufactureDate" ref={register} />
        <br />
        <br />
        <label>Expiration Date:</label> <br />
        <input type="date" name="expirationDate" ref={register} />
        <br />
        <br />
        <label>Price:</label> <br />
        <input type="number" step="0.01" name="price" ref={register} />
        <br />
        <br />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddProducts;
