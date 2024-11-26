import {createSlice} from '@reduxjs/toolkit'

let obj = {
    cartItems : []
};

let Slice = createSlice({
    name : "cart",
    initialState : obj,
    reducers : {
       addToCart : (state,action) => {
          state.cartItems.push(action.payload)
       },
       removeFromCart : (state,action) => {
          state.cartItems.splice(action.payload,1)
       }
    }
})

export const {addToCart,removeFromCart} = Slice.actions
export default Slice.reducer;