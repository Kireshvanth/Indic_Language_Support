import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const searchItems = ['Mobiles', 'Laptops', 'Earphones', 'Smartwatches', 'Cameras', 'Gaming Consoles', 'Televisions', 'Speakers', 'Home Appliances', 'Smart Home']

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
    <div className='flex flex-row gap-2 w-full'>
      <button
        className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl px-20 py-4 min-w-fit h-fit border-2 border-gray-200"
        onClick={() => {
          navigate('/');
        }}
      >
        <h1 className="text-3xl font-semibold font-poppins">Build For</h1>
        <h1 className="text-3xl font-semibold font-poppins">Bharat</h1>
        <img src="/assets/shopping-cart.webp" alt="Shopping Cart" className="absolute -top-[50%] -left-[20%] w-40" />
      </button>

      <div className='flex flex-col gap-2 w-3/4'>
        <div className='flex flex-row gap-2 w-full'>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-[60%] h-16 border-2 border-gray-200 flex flex-row gap-4">
            <img src="/assets/search-icon.webp" alt="Search Icon" className='w-10' />
            <input type="text" placeholder="Search" className="bg-transparent border-none w-full focus:outline-none" />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
            <img src="/assets/mic.webp" alt="Mic Icon" className='w-10' />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
            <img src="/assets/camera2.png" alt="Camera Icon" className='w-10' />
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
          <button
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200 flex items-center"
            onClick={() => {
              navigate('/profile');
            }}
          >
            <img src="/assets/profile.webp" alt="Profile Icon" className='w-8 mx-1' />
          </button>
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
  )
}

const SearchItem = ({ item }) => {
  return (
    <p className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-4 py-2 whitespace-nowrap">{item}</p>
  )
}

export default Header