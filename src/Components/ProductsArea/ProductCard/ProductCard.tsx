import { NavLink } from "react-router-dom";
import ProductsModel from "../Models/ProductsModel";
import "./ProductCard.css";

interface ProductsCardProps {
  singleProduct: ProductsModel;
}


function ProductCard({singleProduct}: ProductsCardProps): JSX.Element {
    const reformatDate= (sqlDate:Date)=> {
        const date= new Date(sqlDate)
        return[
            date.toLocaleDateString(),
            " ",
            date.toLocaleTimeString()
        ]
    }

  return (
    <div className="ProductCard">
      Category name: {singleProduct.categoryName} <br />
      Name: {singleProduct.name} <br />
      Manufacture date: <br />{" "}
      {reformatDate(singleProduct.manufactureDate).map(d=>d)}
      <br />
      Expiration date: <br />
      {reformatDate(singleProduct.manufactureDate).map(d=>d)}
      <br />
      Price: {singleProduct.price}$ <br />
      <NavLink to={"/products/details/" + singleProduct.productId}> delete product </NavLink>
    </div>
  );
}

export default ProductCard;
