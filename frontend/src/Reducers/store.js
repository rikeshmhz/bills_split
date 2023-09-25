import thunk from "redux-thunk"
import orderReducers from "./orderReducers"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"


const rootReducer=combineReducers({
    cart:orderReducers
})

const initialData={
    cart:{
        cart_foods:localStorage.getItem('cart_foods')?JSON.parse(localStorage.getItem('cart_foods')):[]
    }
}
const middleware=[thunk]
export const store=createStore(rootReducer,initialData, composeWithDevTools(
    applyMiddleware(...middleware)
))