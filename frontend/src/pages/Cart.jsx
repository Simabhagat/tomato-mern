import React from 'react';
import { useCart, useDispatchCart } from '../component/CartProvider';

const Cart = () => {
  let data = useCart();
  let total = data.reduce((sum, item) => sum + item.price, 0);
  const dispatch = useDispatchCart()

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:3000/api/createOrder", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  return (
    <div>
      <div className="flex justify-between px-2 pt-3 pb-2  bg-orange-500 py-2">
        <h1 className='text-xl text-white font-bold'>My orders:</h1>
        {!(data.length === 0) ? (
          <div className='flex flex-row items-center justify-center gap-2 text-white'>
            <p className='text-xl'>Total:<span className='text-md'>₹{total}/-</span> </p>
            <button className='checkout-button' onClick={handleCheckOut}>checkout</button>
          </div>
        ) : null}
      </div>
      {data.length === 0 ? (
        <div className="mt-20 text-gray-300 text-center w-full text-3xl">
          The cart is empty
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Item</th>
                <th scope="col" className="px-6 py-3">Size</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} className="odd:bg-gray-700 even:bg-gray-600 border-b border-gray-500">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.size}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <button className="text-red-500 hover:underline" onClick={ async () => {
                      console.log(index)
                      await dispatch({type: "REMOVE", index: index})
                    }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
