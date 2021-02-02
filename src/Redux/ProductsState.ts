import ProductModel from "../Components/ProductsArea/Models/ProductsModel";

export class ProductsState {
    public products: ProductModel[] = [];
}

export enum ProductsActionType {
    ProductsDownloaded,
    ProductAdded
}

export interface ProductsAction {
    type: ProductsActionType;
    payload?: any;
}

export function productsDownloadedAction(products: ProductModel[]): ProductsAction {
    return { type: ProductsActionType.ProductsDownloaded, payload: products }
}

export function productAddedAction(product: ProductModel): ProductsAction {
    return { type: ProductsActionType.ProductAdded, payload: product }
}

export function productReducer(currentState: ProductsState = new ProductsState(), action: ProductsAction): ProductsState{
    const newState = {...currentState};

    switch ( action.type) {

        case ProductsActionType.ProductsDownloaded:
            newState.products=action.payload;
            break;
        case ProductsActionType.ProductAdded:
            newState.products.push(action.payload);
            break;
    }
    return newState;
}