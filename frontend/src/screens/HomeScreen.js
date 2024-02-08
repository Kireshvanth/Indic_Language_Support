import React, { useState } from 'react'
import Timeline from './Timeline';

const HomeScreen = () => {
  const searchItems = ['Mobiles', 'Laptops', 'Earphones', 'Smartwatches', 'Cameras', 'Gaming Consoles', 'Televisions', 'Speakers', 'Home Appliances', 'Smart Home']

  const products = [
    {
      img: 'https://www.androidauthority.com/wp-content/uploads/2021/04/OnePlus-9R-side-profile-showing-back-of-phone.jpg',
      title: 'OnePlus 9R 5G',
      price: '39,999'
    },
    {
      img: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/macbook-pro-14-m2-max.jpg?p=1',
      title: 'MacBook Pro 14"',
      price: '1,24,999'
    },
    {
      img: 'https://fdn.gsmarena.com/imgroot/news/20/07/sony-xb-700/-727w2/gsmarena_011.jpg',
      title: 'Sony WF-XB700',
      price: '7,999'
    },
    {
      img: 'https://www.macworld.com/wp-content/uploads/2023/11/Apple-Watch-Series-8_review_5-2.jpg?quality=50&strip=all',
      title: 'Apple Watch SE',
      price: '29,900'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAfd8klka4Vp8TisGcuZITJq5TFTB5gAvlBOVknIth6Od2rO9xY7KeAPZjGXi5Tk7vQ8&usqp=CAU',
      title: 'Canon EOS 1500D',
      price: '29,999'
    },
    {
      img: 'https://picsum.photos/700',
      title: 'Sony PlayStation 5',
      price: '49,990'
    },
    {
      img: 'https://picsum.photos/700',
      title: 'LG 139 cm (55 inches) 4K Ultra HD Smart OLED TV',
      price: '1,19,999'
    },
    {
      img: 'https://picsum.photos/700',
      title: 'boAt Stone 200',
      price: '999'
    },
    {
      img: 'https://picsum.photos/700',
      title: 'Samsung 6.5 kg Fully-Automatic Top Loading Washing Machine',
      price: '15,490'
    },
    {
      img: 'https://picsum.photos/700',
      title: 'Echo Dot (4th Gen)',
      price: '3,499'
    }
  ];
  const [productCount, setProductCount] = useState(products.map(() => 0));

  const indicLanguages = [
    "English",
    "हिन्दी", // Hindi
    "বাংলা", // Bengali
    "मराठी", // Marathi
    "தமிழ்", // Tamil
    "తెలుగు", // Telugu
    "ગુજરાતી", // Gujarati
    "ಕನ್ನಡ", // Kannada
    "മലയാളം", // Malayalam
    "ਪੰਜਾਬੀ", // Punjabi
    "ଓଡ଼ିଆ", // Odia
    "اردو", // Urdu
    "සිංහල", // Sinhala
    "नेपाली", // Nepali
    "मैथिली", // Maithili
    "संस्कृतम्" // Sanskrit
  ];

  return (
    <div className="flex flex-col gap-8 bg-slate-300 px-20 py-16 w-screen">
      <div className='flex flex-row gap-2 w-full'>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl px-20 py-4 min-w-fit h-fit border-2 border-gray-200">
          <h1 className="text-3xl font-semibold font-poppins">Build For</h1>
          <h1 className="text-3xl font-semibold font-poppins">Bharat</h1>
          <img src="/assets/shopping-cart.webp" alt="Shopping Cart" className="absolute -top-[50%] -left-[20%] w-40" />
        </div>

        <div className='flex flex-col gap-2 w-3/4'>
          <div className='flex flex-row gap-2 w-full'>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-2/3 h-16 border-2 border-gray-200 flex flex-row gap-4">
              <img src="/assets/search-icon.webp" alt="Search Icon" className='w-10' />
              <input type="text" placeholder="Search" className="bg-transparent border-none w-full focus:outline-none" />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
              <img src="/assets/mic.webp" alt="Mic Icon" className='w-10' />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
              <img src="/assets/camera.webp" alt="Camera Icon" className='w-10' />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200 flex flex-row gap-2">
              <img src="/assets/translate.webp" alt="Translate Icon" className='w-10' />
              <select className="w-24 bg-transparent border-none leading-tight focus:outline-none">
                {indicLanguages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-row gap-2 w-full overflow-auto no-scrollbar'>
            {
              searchItems.map((item, index) => (
                <SearchItem key={index} item={item} />
              ))
            }
          </div>
        </div>
      </div>

      <Timeline />

      <div className="flex flex-col gap-2 w-full mt-12">
        <h1 className="text-2xl font-semibold font-poppins">Deals of the Day</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar rounded-lg">
          {
            products.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full -mt-4">
        <h1 className="text-2xl font-semibold font-poppins">Deals of the Day</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar rounded-lg">
          {
            products.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full -mt-4">
        <h1 className="text-2xl font-semibold font-poppins">Deals of the Day</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar rounded-lg">
          {
            products.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

const SearchItem = ({ item }) => {
  return (
    <p className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-4 py-2 whitespace-nowrap">{item}</p>
  )
}

const Product = ({ img, title, price, productState, index }) => {
  const [productCount, setProductCount] = productState;

  return (
    <div className="min-w-64 flex flex-col gap-2">
      <img src={img} alt={title} className="w-full h-40 object-cover rounded-lg shadow-md" />
      <div className="">
        <div className='flex flex-row gap-2 justify-between w-full'>
          <div>
            <h1 className="text-base font-semibold font-poppins">{title}</h1>
            <p className="text-sm font-light font-poppins">
              ₹ {price}
            </p>
          </div>
          <div className="flex flex-row items-center">
            {productCount[index] > 0 ? (
              <div className="text-sm bg-white bg-opacity-20 backdrop-blur-lg border-2 border-gray-200 px-4 py-2 rounded-lg shadow-md font-semibold flex flex-row gap-4">
                <button className="" onClick={() => {
                  setProductCount([...productCount.slice(0, index), productCount[index] - 1, ...productCount.slice(index + 1)]);
                }}>
                  -
                </button>
                {productCount[index]}
                <button className="" onClick={() => {
                  setProductCount([...productCount.slice(0, index), productCount[index] + 1, ...productCount.slice(index + 1)]);
                }}>
                  +
                </button>
              </div>
            ) : (
              <button className="text-sm bg-white bg-opacity-20 backdrop-blur-lg border-2 border-gray-200 px-6 py-2 rounded-lg shadow-md font-semibold"
                onClick={() => {
                  setProductCount([...productCount.slice(0, index), productCount[index] + 1, ...productCount.slice(index + 1)]);
                }}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeScreen