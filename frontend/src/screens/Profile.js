import React from 'react'
import Timeline from '../components/Timeline'

const Profile = () => {
  return (
    <div className="flex flex-col gap-8 px-20">
      <div className='flex flex-row gap-2'>
        <p className="text-2xl font-semibold font-poppins" tkey='Hey'>Hey there, </p>
        <p className="text-2xl font-poppins" tkey='Name'>Jeyam</p>
      </div>

      <p className="text-xl font-medium font-poppins" tkey='Orders'>Your Orders</p>
      <div className="flex flex-col gap-20 w-full">
        <div className="flex flex-row gap-8 items-center">
          <img src="https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg" alt="iPhone" className="w-1/12 object-contain rounded-lg" />
          <div className='flex flex-col w-1/5 gap-0.5'>
            <p className="text-lg font-semibold font-poppins" tkey='o1'>iPhone 12</p>
            <p className="text-sm font-light font-poppins" tkey='o2'>₹ 79,900</p>
            <p className="text-xs font-poppins" tkey='o3'>Delivered on 12th Jan '24</p>
          </div>
          <div className='w-3/5'>
            <Timeline current={5} />
          </div>
        </div>

        <div className="flex flex-row gap-8 items-center">
          <img src="https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg" alt="iPhone" className="w-1/12 object-contain rounded-lg" />
          <div className='flex flex-col w-1/5 gap-0.5'>
            <p className="text-lg font-semibold font-poppins" tkey='o1'>iPhone 12</p>
            <p className="text-sm font-light font-poppins" tkey='o2'>₹ 79,900</p>
            <p className="text-xs font-poppins" tkey='o3'>Ordered on 6th Feb '24 </p>
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