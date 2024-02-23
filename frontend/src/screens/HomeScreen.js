import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { CHAT_URL } from '../api';
import { SearchTextContext } from '../components/Header';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const mainProducts = [
    {
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2024/01/oneplus-12-new-image-1-1-1.jpg',
      title: 'OnePlus 12',
      price: '69,999',
      category: 'Mobiles',
      section: 'Deals of the Day'
    },
    {
      img: 'https://5.imimg.com/data5/SELLER/Default/2022/8/QY/BZ/NQ/148093360/apple-macbook-pro-14-laptop-500x500.jpg',
      title: 'MacBook Pro 14"',
      price: '1,24,999',
      category: 'Laptops',
      section: 'Deals of the Day'
    },
    {
      img: 'https://img.freepik.com/premium-photo/mockup-laptop-presented-digital-art-style-contemporary-product-photography-generative-ai_527096-23348.jpg',
      title: 'Vivobook S 15"',
      price: '80,999',
      category: 'Laptops',
      section: 'Bestsellers'
    },
    {
      img: "https://img.buzzfeed.com/buzzfeed-static/complex/images/Y19jcm9wLGhfNzg2LHdfMTM5OCx4XzgyOCx5Xzc2NQ==/frsma6mdkc6wsqk5d8y0/air-jordan-1-retro-high-og-unc-555088-134-pair.jpg?output-format=jpg&output-quality=auto",
      title: 'Nike Jordan Shoes',
      price: '4,999',
      category: 'Footwear',
      section: 'New Arrivals'
    },
    {
      img: 'https://fdn.gsmarena.com/imgroot/news/20/07/sony-xb-700/-727w2/gsmarena_011.jpg',
      title: 'Sony WF-XB700',
      price: '7,999',
      category: 'Earphones',
      section: 'Bestsellers'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOLIM3YrNbTmR43ghSp-_jD89Imv5WJ6hwQw&usqp=CAU',
      title: 'Apple Watch SE',
      price: '29,900',
      category: 'Smartwatches',
      section: 'Deals of the Day'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAfd8klka4Vp8TisGcuZITJq5TFTB5gAvlBOVknIth6Od2rO9xY7KeAPZjGXi5Tk7vQ8&usqp=CAU',
      title: 'Canon EOS 1500D',
      price: '29,999',
      category: 'Cameras',
      section: 'Deals of the Day'
    },
    {
      img: 'https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg',
      title: 'Sony PlayStation 5',
      price: '49,990',
      category: 'Gaming Consoles',
      section: 'Deals of the Day'
    },
    {
      img: 'https://www.lg.com/content/dam/channel/wcms/in/images/tvs/oled65r1pta_atrz_eail_in_c/gallery/OLED65R1PTA-DZ-1.jpg',
      title: 'LG Rollable 8K OLED TV',
      price: '1,19,999',
      category: 'Televisions',
      section: 'New Arrivals'
    },
    {
      img: 'https://i.gadgets360cdn.com/products/large/vivo-tws-2e-db-800x450-1621510536.jpg?downsize=*:360',
      title: 'Vivo Neo TWS',
      price: '2,999',
      category: 'Earphones',
      section: 'New Arrivals'
    },
    {
      img: 'https://www.stereo.com.sg/pub/media/catalog/product/cache/5fc3014ed970f95b2ceaf2a9ddc3aa5f/1/3/13122023_33707_pm_watch_05.jpg',
      title: 'Nothing CMF Smart Watch',
      price: '20,499',
      category: 'Smartwatches',
      section: 'Bestsellers'
    },
    {
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2023/08/Realme-Buds-Air-5-Pro-1.jpg',
      title: 'Realme Buds Air 3',
      price: '3,499',
      category: 'Earphones',
      section: 'Bestsellers'
    },
    {
      img: 'https://media.comicbook.com/2020/04/nintendo-switch-1218158.jpeg',
      title: 'Nintendo Switch',
      price: '24,499',
      category: 'Gaming Consoles',
      section: 'Bestsellers'
    },
    {
      img: 'https://photofocus.com/reviews/putting-the-tamron-17-28mm-f-2-8-lens-through-its-paces/attachment/julie-powell_1728-2/',
      title: 'Sony Alpha 1 ',
      price: '1,49,999',
      category: 'Cameras',
      section: 'New Arrivals'
    },
    {
      img: 'https://static.wixstatic.com/media/661f56_f5696ff31940480e8e42d1e2e58d59d6.gif',
      title: 'Canon EOS R50 ',
      price: '95,999',
      category: 'Cameras',
      section: 'Deals of the Day'
    },
    {
      img: 'https://www.91-cdn.com/hub/wp-content/uploads/2024/01/honor-magic-6-launch.jpg?tr=w-360,c-at_max,q-100,dpr-2,e-sharpen',
      title: 'Honor Magic 6 Pro',
      price: '66,390',
      category: 'Mobiles',
      section: 'New Arrivals'
    },
    {
      img: 'https://i8.amplience.net/s/scvl/126799_314722_SET/1?fmt=auto',
      title: 'Puma Men\'s Sneakers',
      price: '2,999',
      category: 'Footwear',
      section: 'Bestsellers'
    },
    {
      img: "https://luxor.in/media/catalog/product/cache/1d33a401d7d4f49c41930c20a2e836a7/9/0/9000032908_4_1.jpg",
      title: 'Parker Vector Ball Pen',
      price: '299',
      category: 'Stationery',
      section: 'New Arrivals'
    }
  ];
  const [products, setProducts] = useState(mainProducts);
  const [productCount, setProductCount] = useState(mainProducts.map(() => 0));
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

  const { searchText, loading, filterVal } = useContext(SearchTextContext);

  useEffect(() => {
    if (searchText) {
      setProducts(mainProducts.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase())));
    }
    if (searchText === '') {
      setProducts(mainProducts);
    }
  }, [searchText]);

  useEffect(() => {
    if (filterVal) {
      setProducts(mainProducts.filter((product) => product.category === filterVal));
    }
    if (filterVal === '') {
      setProducts(mainProducts);
    }
  }, [filterVal]);

  const totalAmount = productCount.reduce((acc, curr, index) => {
    return acc + curr * parseInt(mainProducts[index]?.price?.replace(/,/g, ''));
  }, 0);

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: totalAmount * 100,
    name: 'Build for Bharat',
    description: 'Order Confirmation',
    image: '/assets/shopping-cart.webp',
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      const data = JSON.parse(localStorage.getItem('orders'));

      if (data) {
        localStorage.setItem('orders', JSON.stringify([...data, ...mainProducts.filter((product, index) => productCount[index] > 0).map((product, index) => {
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
        localStorage.setItem('orders', JSON.stringify(mainProducts.filter((product, index) => productCount[index] > 0).map((product, index) => {
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
      <div className='fixed bottom-[2.5%] right-[2.5%] z-10'>
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
          <div className={`fixed bottom-28 right-[2.5%] z-20 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-4 w-96 h-96 border-2 border-gray-200 flex flex-col gap-4 shadow-lg`}>
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
        <div className='fixed bottom-[2.5%] left-[2.5%] z-10'>
          <button
            className="bg-green-100 bg-opacity-60 backdrop-blur-lg rounded-2xl p-3 w-fit border-2 border-green-200 flex flex-row items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => {
              setSummaryOpen(!summaryOpen);
            }}
          >
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/cart-5590713-4652405.png" alt="Cart Icon" className='w-14' />
            <div className='flex flex-col items-start'>
              <p className="text-2xl font-semibold font-poppins text-green-700" tkey={'Summary'}>₹ {totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-sm font-medium font-poppins" tkey={'Summary'}>Order Summary</p>
            </div>
          </button>

          {summaryOpen && (
            <div className={`fixed bottom-[14%] left-[2.5%] z-20 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl p-4 w-96 h-96 border-2 border-gray-200 flex flex-col gap-4 shadow-lg`}>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold font-poppins" tkey={'Summary'}>Summary</h1>
                <button
                  onClick={() => {
                    setSummaryOpen(false);
                  }}
                >
                  <img src="/assets/close.webp" alt="Close Icon" className='w-8' />
                </button>
              </div>

              <div className='overflow-y-auto no-scrollbar h-full'>
                {loading && (
                  <div className='overflow-y-auto no-scrollbar h-full gap-4 flex flex-col'>
                    {Array(20).fill().map((_, index) => (
                      <div className='flex flex-row gap-4 items-center justify-between animate-pulse'>
                        <div className='w-16 h-12 bg-gray-400 rounded-lg' />
                        <div className='flex flex-col gap-2'>
                          <div className='w-44 h-6 bg-gray-400 rounded-lg' />
                          <div className='w-20 h-4 bg-gray-400  rounded-lg' />
                        </div>
                        <div className='h-10 w-12 bg-gray-400 rounded-lg' />
                      </div>
                    ))}
                  </div>
                )}
                {mainProducts.map((product, index) => (
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

      {
        loading && (
          <div className="flex flex-col gap-12 w-full animate-pulse pl-20">
            {Array(10).fill().map((_, index) => (
              <div className='flex flex-col gap-2'>
                <div className='h-8 w-56 bg-gray-400 rounded-lg' key={index} />
                <div className='flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20'>
                  {Array(8).fill().map((_, index) => (
                    <div key={index} className="min-w-64 max-w-64 flex flex-col gap-2">
                      <div className="w-full h-40 bg-gray-400 rounded-lg shadow-md" />
                      <div className="flex flex-row gap-2 justify-between w-full">
                        <div className='flex flex-col gap-2'>
                          <div className="w-24 h-4 bg-gray-400 rounded-lg" />
                          <div className="w-16 h-3 bg-gray-400 rounded-lg" />
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="w-16 h-8 bg-gray-400 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }

      {products?.filter(item => item.section === 'Deals of the Day')?.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>Deals of the Day</h1>

          <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
            {
              products?.filter(item => item.section === 'Deals of the Day')?.map((product, index) => (
                <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
              ))
            }
          </div>
        </div>
      )}

      {products?.filter(item => item.section === 'Bestsellers')?.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>Bestsellers</h1>

          <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
            {
              products?.filter(item => item.section === 'Bestsellers')?.map((product, index) => (
                <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
              ))
            }
          </div>
        </div>
      )}

      {products?.filter(item => item.section === 'New Arrivals')?.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-semibold font-poppins pl-20" tkey={'Deal'}>New Arrivals</h1>

          <div className="flex flex-row gap-8 w-full overflow-auto no-scrollbar pr-20">
            {
              products?.filter(item => item.section === 'New Arrivals')?.map((product, index) => (
                <Product key={index} img={product.img} title={product.title} price={product.price} productState={[productCount, setProductCount]} index={index} />
              ))
            }
          </div>
        </div>
      )}
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