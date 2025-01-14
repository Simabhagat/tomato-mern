import React, { useEffect, useState } from 'react'

const Order = () => {
  const [dates, setDates] = useState(null)
  const [date, setDate] = useState("")
  const [orders, setOrders] = useState(null)
  const fetchOrders = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ eId: localStorage.getItem("userEmail") })
      })
      response = await response.json()
      return response

    } catch (error) {
      console.log("Error fetching orders", error)
    }
  }
  useEffect(() => {
    const getOrders = async () => {
      const response = await fetchOrders()
      setOrders(response.ordersList)

    }
    getOrders()
  }, [])

  useEffect(() => {
    if (orders !== null && date === '') {
      setDates(Object.keys(orders).reverse())
      // console.log(date)
      // console.log(orders[date])
   
      setDate(Object.keys(orders).reverse()[0])
    }
  }, [orders, date]);

  return (
    <div className='text-white mt-2'>
      <div className='flex flex-row items-center bg-orange-400 justify-between'>
        <h1 className='text-lg font-semibold'>My orders</h1>
        <div className='flex flex-row items-center justify-center gap-2'>
          <label htmlFor="date" className="text-lg font-semibold">date</label>
          <select name="date" className='bg-green-400'
            onChange={(e) => { setDate(e.target.value) }}>
            {
              dates && dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>))
            }
          </select>
        </div>
        {/* {console.log(orders[date])}
        {orders? <p>{orders[date][0].name}</p> : null} */}
      </div>
      <div>
        {
          date && orders[date] ? (
            <table className="table-auto w-full ">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 text-left">Picture</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders[date].map((order, index) => (
                  <tr
                    key={index} // Use a unique `id` if available
                    className={`border-b`}
                  >
                    <td className="px-4 py-2">
                      <img src={order.image} alt={order.name} className="w-24 h-24 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2">{order.name}</td>
                    <td className="px-4 py-2">{order.size}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          ) : <div>No orders to display</div>
        }
      </div>
    </div>
  )
}

export default Order