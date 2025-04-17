import React, { useContext, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
import { BsSearchHeart } from "react-icons/bs";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from "../Context/UserContext";
import { food_items } from "../Food";
import { useSelector } from "react-redux";

function Nav() {
  let { input, setInput, cate, setCate,showCart,setShowCart } = useContext(dataContext);

  let items = useSelector(state=>state.cart)


  useEffect(() => {
    if (!input || input.trim() === "") {
      setCate(food_items);
    } else {
      let newlist = food_items.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase())
      );
      setCate(newlist);
    }
  }, [input]);

 

  return (
    <div className="w-full h-[100px] flex justify-between items-center px-5 md:px-8">
      <div className="bg-amber-50 w-[60px] h-[60px] flex justify-center items-center rounded-md shadow-xl">
        <MdFastfood className="w-[30px] h-[30px] text-red-500" />
      </div>

      <form
        className="w-[45%] md:w-[70%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <BsSearchHeart className="w-[20px] h-[20px] text-red-500" />
        <input
          type="text"
          placeholder="Search your dish"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-[100%] outline-none text-[15px] md:text-[20px]"
        />
      </form>

      <div className="bg-amber-50 w-[60px] h-[60px] flex justify-center hover:bg-red-100 cursor-pointer items-center rounded-md shadow-xl relative" onClick={()=> {
        setShowCart(true)
      }}>
        <span className="absolute top-0 right-1 text-red-500 font-bold text-[16px]">
          {items.length}
        </span>
        <LuShoppingBag className="w-[30px] h-[30px] text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Nav;
