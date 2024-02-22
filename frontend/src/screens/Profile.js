import React, { useEffect, useState } from 'react'
import Timeline from '../components/Timeline'

const Profile = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: 'iPhone 12',
      price: 79900,
      date: '12th Jan 2024',
      status: 5,
      image: 'https://media.istockphoto.com/id/1313990743/photo/newly-released-iphone-12-purple-color-mockup-set-with-different-angles.jpg?s=612x612&w=0&k=20&c=oUBGS7Lvz5I0OJ0azG06XWZe-0-kZ-QkqpP2wEw8Ymk='
    },
    {
      id: 2,
      name: 'Sony PlayStation 5',
      price: 49990,
      date: '6th Feb 2024',
      status: 3,
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg'
    }
  ]);

  useEffect(() => {
    const data = localStorage.getItem('orders');
    console.log(data);
    if (data) {
      setOrders([...orders, ...JSON.parse(data)]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 px-20">
      <div className='flex flex-row gap-2'>
        <p className="text-2xl font-semibold font-poppins" tkey='Hey'>Hey there, </p>
        <p className="text-2xl font-poppins" tkey='Name'>Jeyam</p>
      </div>

      <p className="text-xl font-medium font-poppins" tkey='Orders'>Your Orders</p>
      <div className="flex flex-col gap-20 w-full">
        {
          orders.map((order, index) => (
            <div className="flex flex-row gap-8 items-center" key={index}>
              <img src={order.image} alt="iPhone" className="w-1/12 object-contain rounded-lg" />
              <div className='flex flex-col w-1/5 gap-0.5'>
                <p className="text-lg font-semibold font-poppins">{order.name}</p>
                <p className="text-sm font-light font-poppins">₹ {order.price}</p>
                <p className="text-xs font-poppins">{order.status === 5 ? 'Delivered' : 'Ordered'} on {order.date}</p>
              </div>
              <div className='w-3/5'>
                <Timeline current={order.status} />
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Profile