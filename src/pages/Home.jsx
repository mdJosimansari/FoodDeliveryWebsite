import React, { use, useContext, useState } from "react";
import Nav from "../Components/Nav";
import Categories from "../Category";
import Card from "../Components/Card";
import { food_items } from "../Food";
import { dataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Card2 from "../Components/Card2";
import { BsEmojiTear } from "react-icons/bs";
import {toast} from 'react-toastify'

function Home() {
  let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext);

  let items = useSelector((state) => state.cart);

  function filter(category) {
    if (category === "All") {
      setCate(food_items);
    } else {
      let newList = food_items.filter(
        (item) => item.food_category === category
      );
      setCate(newList);
    }
  }

  let subtotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let deleveryFee = 20;
  let taxes = (subtotal * 0.5) / 100;
  let total = Math.floor(subtotal + deleveryFee + taxes);

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <Nav />
      {!input ? (
        <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
          {Categories.map((item) => {
            return (
              <div
                key={item.name}
                className="bg-white w-[150px] h-[150px] flex flex-col justify-center items-center rounded-md shadow-xl hover:scale-105 hover:bg-red-100 transition-all duration-300 ease-in-out text-gray-700 font-semibold text-lg tracking-wide cursor-pointer"
                onClick={() => filter(item.name)}
              >
                {item.icon}
                {item.name}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className=" w-full flex flex-wrap justify-center items-center gap-5  mt-10 pb-10 ">
        {cate.length>1?cate.map((item) => (
          <Card
            key={item.id}
            name={item.food_name}
            price={item.price}
            image={item.food_image}
            id={item.id}
            type={item.food_type}
          />
        )) :<div className="flex justify-center items-center text-2xl font-semibold text-red-500" >Dish not found</div> }
        
      </div>

      {/* cart */}

      <div
        className={`w-full md:w-[40vw] top-0 right-0 overflow-auto bg-white h-[100%] fixed shadow-xl ${
          showCart ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-400 ease-in-out`}
      >
        <header className="w-full h-[70px] bg-red-400 flex justify-between items-center px-5 text-white font-semibold text-lg rounded-md">
          <span>Order items</span>
          <RxCross2
            className=" w-[30px] h-[30px] text-2xl cursor-pointer hover:text-gray-400 "
            onClick={() => {
              setShowCart(false);
            }}
          />
        </header>
        {items.length > 0 ? (
          <>
            <div className="  flex flex-col ">
              {items.map((item) => (
                <Card2
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  qty={item.qty}
                />
              ))}
            </div>

            <div className="w-full border-t-2 border-gray-400 mt-5">
              <div className="flex justify-between items-center px-5 mt-2 text-lg  font-semibold">
                <span className=" text-gray-800">Subtotal :</span>
                <span className="text-gray-700">Rs {subtotal}/-</span>
              </div>
              <div className="flex justify-between items-center px-5 mt-2 text-lg font-semibold">
                <span className=" text-gray-800">Delivery Fee :</span>
                <span className="text-gray-700">Rs {deleveryFee}/-</span>
              </div>
              <div className="flex justify-between items-center px-5 mt-2 text-lg font-semibold">
                <span className=" text-gray-800">Taxes :</span>
                <span className="text-gray-700">Rs {taxes}/-</span>
              </div>
              <div className="flex justify-between items-center px-5 mt-2 text-[20px] font-semibold border-t-2 border-gray-400 pt-3">
                <span className=" text-gray-800">Total :</span>
                <span className="text-gray-700">Rs {total}/-</span>
              </div>
            </div>

            <button className="bg-red-400 w-[80%] h-[50px] mx-auto block rounded-md text-white font-semibold hover:bg-red-300 transition-all duration-300 ease-in-out mt-5 mb-5" onClick={()=>{toast.success("Order placed")}}>
              Place Order
            </button>
          </>
        ) : (
       
          <div className="w-full h-[80vh] flex justify-center items-center">
            <span className="text-red-400 flex items-center gap-2 font-semibold text-2xl">
              No Items in cart <BsEmojiTear />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
