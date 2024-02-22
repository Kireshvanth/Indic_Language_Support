import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { CHAT_URL } from '../api';
import { SearchTextContext } from '../components/Header';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2024/01/oneplus-12-new-image-1-1-1.jpg',
      title: 'OnePlus 12',
      price: '69,999'
    },
    {
      img: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/macbook-pro-14-m2-max.jpg?p=1',
      title: 'MacBook Pro 14"',
      price: '1,24,999'
    },
    {
      img: 'https://img.freepik.com/premium-photo/mockup-laptop-presented-digital-art-style-contemporary-product-photography-generative-ai_527096-23348.jpg',
      title: 'Vivobook S 15"',
      price: '80,999'
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
      img: 'https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg',
      title: 'Sony PlayStation 5',
      price: '49,990'
    },
    {
      img: 'https://images.news18.com/ibnlive/uploads/2022/05/lg-rollable-tv-india-16534016784x3.jpg',
      title: 'LG Rollable 8K OLED TV',
      price: '1,19,999'
    },
    {
      img: 'https://www.aptx.com/sites/default/files/2020-07/vivo-tws-neo.jpg',
      title: 'Vivo Neo TWS',
      price: '2,999'
    },
    {
      img: 'https://www.stereo.com.sg/pub/media/catalog/product/cache/5fc3014ed970f95b2ceaf2a9ddc3aa5f/1/3/13122023_33707_pm_watch_05.jpg',
      title: 'Nothing CMF Smart Watch',
      price: '20,499'
    },
    {
      img: 'https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad/images/S300849631_1?1701084621',
      title: 'Realme Buds Air 3',
      price: '3,499'
    },
    {
      img: 'https://media.comicbook.com/2020/04/nintendo-switch-1218158.jpeg',
      title: 'Nintendo Switch',
      price: '24,499'
    },
    {
      img: 'https://photofocus.com/reviews/putting-the-tamron-17-28mm-f-2-8-lens-through-its-paces/attachment/julie-powell_1728-2/',
      title: 'Sony Alpha 1 ',
      price: '1,49,999'
    },
    {
      img: 'https://static.wixstatic.com/media/661f56_f5696ff31940480e8e42d1e2e58d59d6.gif',
      title: 'Canon EOS R50 ',
      price: '95,999'
    },
    {
      img: 'https://static.wixstatic.com/media/661f56_f5696ff31940480e8e42d1e2e58d59d6.gif',
      title: 'Canon EOS R50 ',
      price: '95,999'
    },
    {
      img: 'https://images.fonearena.com/blog/wp-content/uploads/2024/01/HONOR-Magic-6-and-Magic-6-Pro-1024x812.jpg',
      title: 'Honor Magic 6 Pro',
      price: '66,390'
    }
  ]);
  const mainProducts = [
    {
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2024/01/oneplus-12-new-image-1-1-1.jpg',
      title: 'OnePlus 12',
      price: '69,999'
    },
    {
      img: 'https://www.digitaltrends.com/wp-content/uploads/2023/02/macbook-pro-14-m2-max.jpg?p=1',
      title: 'MacBook Pro 14"',
      price: '1,24,999'
    },
    {
      img: 'https://img.freepik.com/premium-photo/mockup-laptop-presented-digital-art-style-contemporary-product-photography-generative-ai_527096-23348.jpg',
      title: 'Vivobook S 15"',
      price: '80,999'
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
      img: 'https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg',
      title: 'Sony PlayStation 5',
      price: '49,990'
    },
    {
      img: 'https://images.news18.com/ibnlive/uploads/2022/05/lg-rollable-tv-india-16534016784x3.jpg',
      title: 'LG Rollable 8K OLED TV',
      price: '1,19,999'
    },
    {
      img: 'https://www.aptx.com/sites/default/files/2020-07/vivo-tws-neo.jpg',
      title: 'Vivo Neo TWS',
      price: '2,999'
    },
    {
      img: 'https://www.stereo.com.sg/pub/media/catalog/product/cache/5fc3014ed970f95b2ceaf2a9ddc3aa5f/1/3/13122023_33707_pm_watch_05.jpg',
      title: 'Nothing CMF Smart Watch',
      price: '20,499'
    },
    {
      img: 'https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad/images/S300849631_1?1701084621',
      title: 'Realme Buds Air 3',
      price: '3,499'
    },
    {
      img: 'https://media.comicbook.com/2020/04/nintendo-switch-1218158.jpeg',
      title: 'Nintendo Switch',
      price: '24,499'
    },
    {
      img: 'https://photofocus.com/reviews/putting-the-tamron-17-28mm-f-2-8-lens-through-its-paces/attachment/julie-powell_1728-2/',
      title: 'Sony Alpha 1 ',
      price: '1,49,999'
    },
    {
      img: 'https://static.wixstatic.com/media/661f56_f5696ff31940480e8e42d1e2e58d59d6.gif',
      title: 'Canon EOS R50 ',
      price: '95,999'
    },
    {
      img: 'https://static.wixstatic.com/media/661f56_f5696ff31940480e8e42d1e2e58d59d6.gif',
      title: 'Canon EOS R50 ',
      price: '95,999'
    },
    {
      img: 'https://images.fonearena.com/blog/wp-content/uploads/2024/01/HONOR-Magic-6-and-Magic-6-Pro-1024x812.jpg',
      title: 'Honor Magic 6 Pro',
      price: '66,390'
    }
  ];
  const [productCount, setProductCount] = useState(products.map(() => 0));
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [userChat, setUserChat] = useState([]);
  const [botChat, setBotChat] = useState(['Hi, how can I help you?']);
  const [inputText, setInputText] = useState('');

  const [summaryOpen, setSummaryOpen] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setUserChat([...userChat, message]);
    setInputText('');
    setBotChat([...botChat, 'Typing...']);

    await axios.post(CHAT_URL, { 'msg': message })
      .then((response) => {
        setBotChat((prev) => {
          let newBotChat = [...prev];
          newBotChat.pop();
          return [...newBotChat, response?.data?.reply];
        });
      })
      .catch((error) => {
        console.error(error);
        setBotChat((prev) => {
          let newBotChat = [...prev];
          newBotChat.pop();
          return [...newBotChat, 'Sorry, I am not able to understand that'];
        });
      });
  }

  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [botChat, userChat]);

  const searchText = useContext(SearchTextContext);

  useEffect(() => {
    if (searchText) {
      setProducts((prev) => {
        return prev.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));
      });
    }
    if (searchText === '') {
      setProducts(mainProducts);
    }
  }, [searchText]);

  const totalAmount = productCount.reduce((acc, curr, index) => {
    return acc + curr * parseInt(products[index].price.replace(/,/g, ''));
  }, 0);

  const options = {
    key: 'rzp_test_wH6FaE7zkaF2xJ',
    amount: totalAmount * 100,
    name: 'Build for Bharat',
    description: 'Order Confirmation',
    image: '/assets/shopping-cart.webp',
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      const data = JSON.parse(localStorage.getItem('orders'));

      if (data) {
        localStorage.setItem('orders', JSON.stringify([...data, ...products.filter((product, index) => productCount[index] > 0).map((product, index) => {
          return {
            id: index + 1,
            name: product.title,
            price: product.price,
            date: new Date().toLocaleDateString(),
            status: 1,
            image: product.img
          }
        })
        ])
        );
      } else {
        localStorage.setItem('orders', JSON.stringify(products.filter((product, index) => productCount[index] > 0).map((product, index) => {
          return {
            id: index + 1,
            name: product.title,
            price: product.price,
            date: new Date().toLocaleDateString(),
            status: 1,
            image: product.img
          }
        })
        ));
      }
      navigate('profile');
    },
    prefill: {
      name: 'John Doe',
      contact: '9999999999',
      email: 'demo@demo.com'
    },
    notes: {
      address: 'some address'
    },
    theme: {
      color: 'blue',
      hide_topbar: false
    }
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className='fixed bottom-[2.5%] left-[2.5%] z-10'>
        <button
          className="bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-2 w-fit h-16 border-2 border-gray-200 flex flex-row items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={() => {
            setChatBotOpen(!chatBotOpen);
          }}
        >
          <img src="/assets/chatbot.webp" alt="Chatbot Icon" className='w-10' />
          <p className="text-sm font-semibold font-poppins" tkey={'Chat'}>Chat with us</p>
        </button>

        {chatBotOpen && (
          <div className={`fixed bottom-28 left-[2.5%] z-20 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-4 w-96 h-96 border-2 border-gray-200 flex flex-col gap-4 shadow-lg`}>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-lg font-semibold font-poppins" tkey={'Chat'}>Chat with us</h1>
              <button
                onClick={() => {
                  setChatBotOpen(false);
                }}
              >
                <img src="/assets/close.webp" alt="Close Icon" className='w-8' />
              </button>
            </div>

            <div className='overflow-y-auto no-scrollbar h-full' ref={chatContainerRef}>
              {botChat.map((chat, index) => (
                <div key={index} className="flex flex-col gap-2 mb-2">
                  <div className="flex flex-row gap-4 items-center">
                    <img src="/assets/chatbot.webp" alt="Chatbot Icon" className='w-8' />
                    <p className="text-sm font-poppins max-w-[70%]">{chat}</p>
                  </div>
                  {userChat[index] && (
                    <div className="flex flex-row gap-4 items-center justify-end">
                      <p className="text-sm font-poppins text-right max-w-[70%]">{userChat[index]}</p>
                      <img src="/assets/profile.webp" alt="User Icon" className='w-6' />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-2 w-full">
              <input
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage(inputText);
                  }
                }}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                value={inputText}
                type="text"
                placeholder="Type a message"
                className="w-5/6 h-12 rounded-lg border-2 border-gray-200 bg-white bg-opacity-20 backdrop-blur-lg px-4 py-2 focus:outline-none font-poppins text-sm"
              />
              <button
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-2 border-2 border-gray-200"
                onClick={() => {
                  sendMessage(inputText);
                }}
              >
                <img src="/assets/send.webp" alt="Send Icon" className='w-7' />
              </button>
            </div>
          </div>
        )}
      </div>

      {totalAmount > 0 && (
        <div className='fixed bottom-[2.5%] right-[2.5%] z-10'>
          <button
            className="bg-green-100 bg-opacity-60 backdrop-blur-lg rounded-2xl p-3 w-fit border-2 border-green-200 flex flex-row items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => {
              setSummaryOpen(!summaryOpen);
            }}
          >
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/cart-5590713-4652405.png" alt="Cart Icon" className='w-14' />
            <div className='flex flex-col items-start'>
              <p className="text-2xl font-semibold font-poppins text-green-700" tkey={'Chat'}>₹ {totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm font-medium font-poppins" tkey={'Chat'}>Order Summary</p>
            </div>
          </button>

          {summaryOpen && (
            <div className={`fixed bottom-[14%] right-[2.5%] z-20 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-4 w-96 h-96 border-2 border-gray-200 flex flex-col gap-4 shadow-lg`}>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold font-poppins" tkey={'Chat'}>Summary</h1>
                <button
                  onClick={() => {
                    setSummaryOpen(false);
                  }}
                >
                  <img src="/assets/close.webp" alt="Close Icon" className='w-8' />
                </button>
              </div>



              <div className='overflow-y-auto no-scrollbar h-full'>
                {products.map((product, index) => (
                  productCount[index] > 0 && (
                    <div key={index} className="flex flex-row gap-4 items-center justify-between mt-3">
                      <div className="flex flex-row gap-4 items-center">
                        <img src={product.img} alt={product.title} className='w-16 h-10 object-cover rounded-md' />
                        <div className="flex flex-col">
                          <p className="text-sm font-medium font-poppins" tkey={product.title}>{product.title}</p>
                          <p className="text-xs font-light font-poppins" tkey={'Price'}>₹ {product.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <button
                          onClick={() => {
                            setProductCount([...productCount.slice(0, index), productCount[index] - 1, ...productCount.slice(index + 1)]);
                          }}
                        >
                          -
                        </button>
                        <p className="text-sm font-medium font-poppins">{productCount[index]}</p>
                        <button
                          onClick={() => {
                            setProductCount([...productCount.slice(0, index), productCount[index] + 1, ...productCount.slice(index + 1)]);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-medium font-poppins" tkey={'Total'}>Total</p>
                <p className="text-lg font-medium font-poppins" tkey={'Total'}>₹ {totalAmount.toLocaleString('en-IN')}</p>
              </div>

              <div className="flex flex-row gap-2 w-full">
                <button
                  className="bg-green-100 bg-opacity-60 backdrop-blur-lg rounded-lg p-2 border-2 border-green-200 w-full"
                  onClick={openPayModal}
                >
                  <p className="text-sm font-semibold font-poppins text-green-700" tkey={'Checkout'}>Confirm & Proceed</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>Deals of the Day</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
          {
            products?.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full -mt-4">
        <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>Bestseller</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
          {
            products?.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full -mt-4">
        <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>New Arrivals</h1>

        <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
          {
            products?.map((product, index) => (
              <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

const Product = ({ img, title, price, productState, index }) => {
  const [productCount, setProductCount] = productState;

  return (
    <div className={`min-w-64 max-w-64 flex flex-col gap-2 ${index === 0 && 'ml-20'}`}>
      <img src={img} alt={title} className="w-full h-40 object-cover rounded-lg shadow-md" />
      <div className="">
        <div className='flex flex-row gap-2 justify-between w-full'>
          <div>
            <h1 className="text-base font-semibold font-poppins" tkey={title}>{title}</h1>
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
                tkey={'Add'}
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