import { ADD_TO_ORDER, REMOVE_FROM_ORDER } from './orderConstant'

const orderReducers = (state={},action) => {
  switch(action.type){
    case ADD_TO_ORDER:
        let new_food=action.payload
        let foodExist=state.cart_foods.find(item=>item.food_id===new_food.food_id)
        if(!foodExist){
            return{...state,cart_foods:[...state.cart_foods,action.payload]}
        }else{
            return{...state,cart_foods:state.cart_foods.map(item=>
            item.food_id===new_food.food_id?new_food:item
            )}
        }
    
    case REMOVE_FROM_ORDER:
        return{cart_foods:[...state.cart_foods.filter(item=>item.food_id!==action.payload)]}
    default:
        return{...state}
  }
}

export default orderReducers