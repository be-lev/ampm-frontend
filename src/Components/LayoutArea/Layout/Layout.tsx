import React from "react";
import { BrowserRouter, NavLink, Redirect, Route, Switch  } from "react-router-dom";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout">
						<h1>Welcome to am-pm grocery store</h1>
            <h3>This is the place to find all your food products</h3>
            <nav>
                <NavLink to="/products">products list</NavLink>
                <span> | </span>
                <NavLink to="/add-product">Add products</NavLink>
            </nav>
            <hr/>

            <Switch>
                <Route path="/products" component={ProductsList} exact/>
                <Route path="/add-product" component={AddProduct} exact/>
                <Redirect from="/" to="/products" exact />
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default Layout;
