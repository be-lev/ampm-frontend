import { NavLink } from "react-router-dom";
import ProductsModel from "../Models/ProductsModel";
import "./ProductCard.css";

interface ProductsCardProps {
  singleProduct: ProductsModel;
}

function ProductCard(props: ProductsCardProps): JSX.Element {
  return (
    <div className="ProductCard">
      Category name: {props.singleProduct.categoryName} <br />
      Name: {props.singleProduct.name} <br />
      Manufacture date: <br />{" "}
      {new Date(props.singleProduct.manufactureDate).toLocaleDateString()}{" "}
      {new Date(props.singleProduct.manufactureDate).toLocaleTimeString()}
      <br />
      Expiration date: <br />
      {new Date(props.singleProduct.expirationDate).toLocaleDateString()}{" "}
      {new Date(props.singleProduct.expirationDate).toLocaleTimeString()}
      <br />
      Price: {props.singleProduct.price}$ <br />
      <NavLink to={"/products/details/" + props.singleProduct.productId}> delete product </NavLink>
    </div>
  );
}

export default ProductCard;
