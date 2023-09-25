import { getmenudetails } from "../api/userApi"
import { ADD_TO_ORDER, REMOVE_FROM_ORDER } from "./orderConstant"

export const add_food_to_order=(food,quantity)=> async(dispatch,getState)=>{
    let data=await getmenudetails(food)
    dispatch({
        type:ADD_TO_ORDER,
        payload:{
            food_id:data._id,
            food_name:data.food_name,
            food_price:data.food_price,
            quantity:quantity
        }
    })
    localStorage.setItem("cart_foods",JSON.stringify(getState().cart.cart_foods))
}

export const remove_food_from_order=(food)=> (dispatch,getState)=>{
    dispatch({
        type:REMOVE_FROM_ORDER,
        payload:food
    })
    localStorage.setItem("cart_foods",JSON.stringify(getState().cart.cart_foods))
}