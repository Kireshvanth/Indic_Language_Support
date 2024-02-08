import React from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'

const Profile = () => {
  return (
    <div className="flex flex-col gap-8 bg-slate-300 px-20 py-16 w-screen min-h-screen">
      <Header />

      <p className="text-2xl font-semibold font-poppins">Hey there, <span className='font-normal'>Jeyam</span></p>

      <p className="text-xl font-medium font-poppins">Your Orders</p>
      <div className="flex flex-col gap-20 w-full">
        <div className="flex flex-row gap-8 items-center">
          <img src="https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg" alt="iPhone" className="w-1/12 object-contain rounded-lg" />
          <div className='flex flex-col w-1/5 gap-0.5'>
            <p className="text-lg font-semibold font-poppins">iPhone 12</p>
            <p className="text-sm font-light font-poppins">₹ 79,900</p>
            <p className="text-xs font-poppins">Delivered on 12th Jan '24</p>
          </div>
          <div className='w-3/5'>
            <Timeline current={5} />
          </div>
        </div>

        <div className="flex flex-row gap-8 items-center">
          <img src="https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg" alt="iPhone" className="w-1/12 object-contain rounded-lg" />
          <div className='flex flex-col w-1/5 gap-0.5'>
            <p className="text-lg font-semibold font-poppins">iPhone 12</p>
            <p className="text-sm font-light font-poppins">₹ 79,900</p>
            <p className="text-xs font-poppins">Ordered on 6th Feb '24 </p>
          </div>
          <div className='w-3/5'>
            <Timeline current={3} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile