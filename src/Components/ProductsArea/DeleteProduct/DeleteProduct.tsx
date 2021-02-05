import React, { Component } from "react";
import {NavLink, RouteComponentProps } from "react-router-dom";
import ProductModel from "../Models/ProductsModel";
import { History } from "history";

import store from "../../../Redux/store";
import axios from "axios";
import { ProductsActionType } from "../../../Redux/ProductsState";

interface MatchParams{
    prodId: string;
}

interface DetailsProps extends RouteComponentProps<MatchParams>{
    history: History;
}

interface DetailsState {
    product: ProductModel;
}

class Details extends Component<DetailsProps, DetailsState> {

    public constructor(props: DetailsProps){
        super(props)

        const id= +this.props.match.params.prodId;
        console.log("id: " +id);
        this.state={product: store.getState().productReducer.products.find(p=> p.productId === id)}
        console.log(this.state);
    }

    private deleteProduct = async () => {
        const answer = window.confirm("are you sure?");
        if(!answer) return;
        await axios.delete<ProductModel>("http://localhost:3003/api/products/"+ this.state.product.productId);
        store.dispatch({ type: ProductsActionType.ProductDeleted, payload: this.state.product.productId });
        this.props.history.push("/products"); // SPA Redirect
    }

    public render(): JSX.Element {
        return (
            <div className="Details">
				    {this.state.product &&
                    <>
                        <h2>Product Details:</h2>
                        <h3>{this.state.product.name}</h3>
                        <h3>{this.state.product.categoryName}</h3>
                        <h3>Manufacture date: {this.state.product.manufactureDate}</h3>
                        <h3>Expiration date: {this.state.product.expirationDate}</h3>
                        <h3>Price: {this.state.product.price}$</h3>
                        <br /> <br />
                        <NavLink to="/products">Back to List</NavLink>
                        <span> | </span>
                        <a href="#" onClick={this.deleteProduct}>Delete product</a>
                    </>
                }
            </div>
        );
    }
}

export default Details;
