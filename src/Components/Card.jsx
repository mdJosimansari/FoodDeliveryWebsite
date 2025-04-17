import React from "react";
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/cartSlice";
import { toast } from "react-toastify";


function Card({name, price, image,id, type}) {

  let dispatch = useDispatch();

  return (
    <div>
      <div className=" m-2 p-3 w-[300px] h-[350px] max-w-sm bg-white rounded-lg shadow-lg transition-all Transition-transform hover:duration-300  hover:scale-105 hover:shadow-xl hover:shadow-red-500/40  ">
        <img
          className="w-full h-48 rounded-lg overflow-hidden object-cover    "
          src={image}
          alt="Card Image"  
        />
        <div className="mt-2">
          <h3 className=" text-2xl  -left font-semibold text-gray-900">{name}</h3>
        </div>
        <div className="flex justify-between items-center mt-2 ">
          <div className="text-red-500 font-bold text-lg">Rs {price}/-</div>
         <div className="flex justify-center item-center gap-2 text-lg"> { type === "veg"? <LuLeafyGreen className="text-red-500 mt-1 "/> :<GiChickenOven className=" text-red-500 mt-1"/> } <span className="font-semibold text-red-500">{type}</span></div>
        </div>

        <div className="text-white font-semibold flex justify-center p-2 rounded-lg items-center mt-2 bg-red-400  hover:bg-red-300 transition-all cursor-pointer">
            <button className=" text-lg cursor-pointer" onClick={()=>{dispatch(addItem({id:id,name:name,price:price,image:image,qty:1}));
          toast.success("Item Added")}}>Add to Dish</button>
        </div>
      </div>
    </div> 
  );
}

export default Card;  
