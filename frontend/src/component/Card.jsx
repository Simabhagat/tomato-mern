import React, { useState } from "react";
import { useDispatchCart, useCart } from "./CartProvider";

export const Card = (props) => {
  let dispatch = useDispatchCart()
  let data = useCart()
  const { options, foodItem } = props;
  const priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(priceOptions[0])
  let price = quantity * parseInt(options[size])

  const handleAddToCart = async () => {
    // console.log("size: ", size)
    // for(const item of data){
    //   if(item.id === foodItem._id && item.size === size){
    //     console.log("test")
    //     await dispatch({type: "UPDATE", id: foodItem._id, quantity: quantity, price: price, size: size})
    //     return
    //   }
    // }
    await dispatch({type: "ADD", id: foodItem._id, name: foodItem.name,image: foodItem.img, quantity: parseInt(quantity), size: size, price: price})
    return
  }

  return (
    <div className="card-wrapper rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      {/* Image */}
      <img
        src={foodItem.img}
        alt="food"
        className="w-full h-48 object-cover"
      />
      {/* Content */}
      <div className="flex flex-col p-4">
        {/* Food Name */}
        <p className="text-lg font-semibold text-white">{foodItem.name}</p>

        {/* Description */}
        <p className="text-sm text-white mt-1">{foodItem.description}</p>

        {/* Options and Total */}
        <div className="flex flex-row items-center justify-between mt-4">
          {/* Quantity Selector */}
          <select className="m-2 bg-green-400 text-white rounded-sm text-sm px-2 py-1 focus:outline-none" 
           onChange={(e) => setQuantity(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Price Selector */}
          <select className="m-2 bg-green-400 text-white rounded-sm text-sm px-2 py-1 focus:outline-none"
            onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>

          {/* Total Price */}
          <p className="text-sm font-semibold text-white">
            Total: <span className="text-white">₹{price}/-</span>
          </p>
        </div>
        <div className="flex flex-row-reverse">
          <button 
            onClick={handleAddToCart}
            className="bg-green-400 px-2 py-1 rounded-md mt-2 hover:scale-105 transform transition duration-300">
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};
