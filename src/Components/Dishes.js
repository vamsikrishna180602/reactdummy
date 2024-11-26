import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { addToCart } from '../reducer';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Dishes({ area }) {
  const [dishItem, setDishItem] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const { search } = useOutletContext();
  let dispatch = useDispatch()

  useEffect(() => {
    if (search) {
      setLoading(true);
      axios
        .get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${area.lat}&lng=${area.lng}&str=${search}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=21f8e400-b286-39dd-b4f2-2da8bd47cba9`)
        .then((res) => {
          setDishItem(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1) || []);
          console.log(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1) || [])
          setIsSearched(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [search, area]);

  const Shimmer = () => (
    <div className="p-2 rounded-xl bg-white shadow mb-3 w-full animate-pulse">
      <div className="flex p-2 rounded-xl bg-gray-100 shadow">
        <div className="w-32 h-36 bg-gray-300 rounded-lg"></div>
        <div className="ml-4 flex-1 space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-14 mt-3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-[60%] mx-auto'>
      {isSearched ? (
        loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 mt-6'>
            {Array(8).fill(0).map((_, i) => (
              <Shimmer key={i} />
            ))}
          </div>
        ) : (
          dishItem.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 mt-6'>
              {dishItem.map((item, i) => (
                <div key={i} className='p-2 rounded-xl bg-white shadow mb-2 w-full hover:bg-gray-100 transition duration-300'>
                  <div >
                    <div className='p-2 rounded-xl bg-white  w-full mb-2'>
                      <h1 className='text-lg  '>{item?.card?.card?.restaurant?.info?.name}</h1>
                    </div>
                    <div className='flex p-2 rounded-xl bg-gray-100 shadow'>
                      <div className="w-32 h-36 overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={item?.card?.card?.info?.imageId
                            ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.imageId}`
                            : 'https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?semt=ais_hybrid'}
                          alt={item?.card?.card?.info?.name}
                          className="h-36 w-32 object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className='ml-4 flex flex-col justify-between'>
                        <div>
                          <p className='text-lg font-semibold'>{item?.card?.card?.info?.name}</p>
                          <p className='text-gray-700 text-sm'>{item?.card?.card?.info?.cuisines?.slice(0, 3)?.join(', ')}</p>
                          <p className='text-gray-700 text-sm flex items-center gap-2'>
                            Rating: <FaStar className={`mr-2 ${item?.card?.card?.info?.ratings?.aggregatedRating?.rating >= 4.0 ? "text-yellow-500" : "text-red-500"}`} /> {item?.card?.card?.info?.ratings?.aggregatedRating?.rating}
                          </p>
                          <p className='text-gray-700 text-sm'>Price: ₹{item?.card?.card?.info?.price / 100}</p>
                          <p className='text-gray-700 text-sm'>{item?.card?.card?.restaurant?.info?.areaName}</p>
                        </div>
                        <button
  className='mt-3 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 w-14 font-semibold transition-transform transform hover:scale-105 active:scale-95 focus:outline-none  focus:ring-green-400'
  onClick={() => {
    dispatch(addToCart({
      Name: item?.card?.card?.info?.name,
      price: item?.card?.card?.info?.price ? item?.card?.card?.info?.price / 100 : item?.card?.card?.info?.defaultPrice / 100,
      img: item?.card?.card?.info?.imageId
        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.imageId}`
        : 'https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?semt=ais_hybrid',
    }))
    toast("Item Added to Cart", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        color: "white",
        backgroundColor: "green",
        borderRadius: "8px",
        fontWeight: "bold",
        padding: "12px",
        textAlign: "center",
      }
    });
    
  }}
>
  ADD
</button>

        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-700 mt-6'>No dishes found for "{search}"</p>
          )
        )
      ) : (
        <p className='text-center text-gray-700 mt-6'>Search for a dish to see results</p>
      )}
      <ToastContainer/>
    </div>
  );
}

export default Dishes;
