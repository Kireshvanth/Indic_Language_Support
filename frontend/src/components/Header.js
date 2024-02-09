import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EN_INDIC } from '../api';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const searchItems = ['Mobiles', 'Laptops', 'Earphones', 'Smartwatches', 'Cameras', 'Gaming Consoles', 'Televisions', 'Speakers', 'Home Appliances', 'Smart Home']

  const indicLanguages = {
    // "English",
    // "हिन्दी", // Hindi
    // "বাংলা", // Bengali
    // "मराठी", // Marathi
    // "தமிழ்", // Tamil
    // "తెలుగు", // Telugu
    // "ગુજરાતી", // Gujarati
    // "ಕನ್ನಡ", // Kannada
    // "മലയാളം", // Malayalam
    // "ਪੰਜਾਬੀ", // Punjabi
    // "ଓଡ଼ିଆ", // Odia
    // "اردو", // Urdu
    // "සිංහල", // Sinhala
    // "नेपाली", // Nepali
    // "मैथिली", // Maithili
    // "संस्कृतम्" // Sanskrit
    "English": "eng_Latn",
    "हिन्दी": "hin_Deva",
    "தமிழ்": "tam_Taml",
    "తెలుగు": "tel_Telu",
    "ಕನ್ನಡ": "kan_Knda",
  };
  const [currentLang, setCurrentLang] = useState('');

  const translate = () => {
    document.querySelectorAll('[tkey]').forEach(async (element) => {
      const key = element.getAttribute('tkey');
      const value = element.innerHTML;

      await axios.post(EN_INDIC, { sentences: [value], tgt_lang: indicLanguages[currentLang] })
        .then((response) => {
          element.innerHTML = response.data.translations[0];
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  useEffect(() => {
    if (currentLang === 'English' || currentLang === '') {
      return;
    }
    translate();
  }, [currentLang]);

  return (
    <div className="flex flex-col gap-8 bg-slate-300 px-20 py-16 w-screen min-h-screen">
      <div className='flex flex-row gap-2 w-full'>
        <button
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl px-20 py-4 min-w-fit h-fit border-2 border-gray-200"
          onClick={() => {
            navigate('/');
          }}
        >
          <h1 className="text-3xl font-semibold font-poppins" tkey='title'>Build For</h1>
          <h1 className="text-3xl font-semibold font-poppins -ml-6" tkey='title2'>Bharat</h1>
          <img src="/assets/shopping-cart.webp" alt="Shopping Cart" className="absolute -top-[50%] -left-[20%] w-40" />
        </button>

        <div className='flex flex-col gap-2 w-3/4'>
          <div className='flex flex-row gap-2 w-full'>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-[60%] h-16 border-2 border-gray-200 flex flex-row gap-4">
              <img src="/assets/search-icon.webp" alt="Search Icon" className='w-10' />
              <input type="text" placeholder="Search" className="bg-transparent border-none w-full focus:outline-none" tkey='Search' />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
              <img src="/assets/mic.webp" alt="Mic Icon" className='w-10' />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200">
              <img src="/assets/camera2.png" alt="Camera Icon" className='w-10' />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200 flex flex-row gap-2">
              <img src="/assets/translate.webp" alt="Translate Icon" className='w-10' />
              <select
                className="w-24 bg-transparent border-none leading-tight focus:outline-none"
                value={currentLang}
                onChange={(event) => {
                  setCurrentLang(event.target.value);
                }}
              >
                {Object.keys(indicLanguages)?.map((language, index) => (
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

      <Outlet />
    </div>
  )
}

const SearchItem = ({ item }) => {
  return (
    <p className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg px-4 py-2 whitespace-nowrap" tkey={item}>{item}</p>
  )
}

export default Header