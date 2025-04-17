import  { createSlice} from '@reduxjs/toolkit';

 const cartSlice = createSlice({
    name: 'cart',
    initialState:[],
    reducers:{
        addItem:(state,action)=>{
            let existItem = state.find((item) => item.id=== action.payload.id)
            if(existItem){
               return state.map((item)=>(item.id === action.payload.id?{...item,qty:item.qty+1}:item))
            }else{
               state.push(action.payload);  
            }
           
        },
        removeItem:(state,action)=>{
            return state.filter((item)=> item.id !== action.payload);
         
        },
        increment:(state,action)=>{
            return state.map((item)=>(item.id === action.payload?{...item,qty:item.qty+1}:item))
        },
        decrement:(state,action)=>{
            return state.map((item)=>(item.id === action.payload?{...item,qty:item.qty-1}:item))
        },
    },
 });

 export const {addItem,removeItem,increment,decrement} = cartSlice.actions;
 export default cartSlice.reducer;  