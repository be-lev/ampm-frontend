import CategoryModel from "../Components/ProductsArea/Models/CategoryModel";

export class CategoriesState {
    public categories: CategoryModel[] = [];
}

export enum CategoriesActionType {
    CategoriesDownloaded
  
}

export interface CategoriesAction {
    type: CategoriesActionType;
    payload?: any;
}

export function categoriesDownloadedAction(categories: CategoryModel[]): CategoriesAction {
    return { type: CategoriesActionType.CategoriesDownloaded, payload: categories }
}


export function categoryReducer(currentState: CategoriesState = new CategoriesState(), action: CategoriesAction): CategoriesState {
    const newState = { ...currentState };

    switch (action.type) {

        case CategoriesActionType.CategoriesDownloaded:
            newState.categories = action.payload;
            break;
    }
    return newState;
}