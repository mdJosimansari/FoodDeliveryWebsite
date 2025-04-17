import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { decrement, increment, removeItem } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Card2({id,name,price,image,qty}) {

  let dispatch = useDispatch();

  return (     
    <div className="w-full h-[120px] shadow-lg p-2 flex justify-between mt-5 ">
  <div className="w-[60%] h-full flex gap-5">
    <div className="w-[60%] h-full overflow-hidden rounded-xl">
      <img
        src={image}
        alt="food-image"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>

    <div className="w-[40%] flex flex-col h-full gap-5">
      <div className="text-lg text-gray-800 font-semibold">{name}</div>

      <div className="w-[110px] h-[50px] bg-slate-400 flex mt-2 rounded-lg shadow-lg overflow-hidden font-semibold border-2 border-red-400 text-xl">
        <button
          
          className="w-[30%] h-full text-red-400 bg-white flex justify-center items-center hover:bg-gray-200"
          onClick={()=>{
            if(qty===1){
              dispatch(removeItem(id))
            }else{
              dispatch(decrement(id))
            }
            toast.error("Item Removed")
          }}
        >
          -
        </button>

        <span className="w-[40%] h-full text-red-400 bg-slate-200 flex justify-center items-center">
          {qty}
        </span>

        <button
          className="w-[30%] h-full text-red-400 bg-white flex justify-center items-center hover:bg-gray-200"
          onClick={()=>{
            dispatch(increment(id))
          }}
        >
          +
        </button>
      </div>
    </div>
  </div>

  <div className="flex flex-col justify-start items-end  gap-8">
    <span className="text-red-400 font-semibold text-xl">
      Rs {price}/-
    </span>
    <RiDeleteBin5Line
      className="h-[30px] w-[30px] cursor-pointer text-red-400 hover:text-red-500"
      
      onClick={() => {dispatch(removeItem(id),
      );
        toast.error("Item Removed")}}
    />
  </div>
</div>

  );
}

export default Card2;
