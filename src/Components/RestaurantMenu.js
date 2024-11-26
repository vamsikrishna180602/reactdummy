import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Accordion from './Accordion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar} from "react-icons/fa";


function RestaurantMenu() {
  let params = useParams();
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4425524&lng=78.4302613&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`)
      .then((res) => {
        setRestaurantMenuData(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards?.splice(1));
        console.log(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards?.splice(1));
      });
  }, [params.restId]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">{params?.restName}'s Menu</h1>
      {restaurantMenuData.map((item, i) => {
        if (item?.card?.card?.itemCards) {
          return (
            <Accordion
              key={i}
              title={`${item?.card?.card?.title} (${item?.card?.card?.itemCards?.length})`}
            >
              {item?.card?.card?.itemCards?.map((item, i) => (
                <div key={i} className='flex bg-gray-50 border p-4 my-2 rounded shadow-sm hover:bg-gray-100 transition duration-300'>
                  <div className="w-3/4 space-y-2">
                 
                    <h2 className="font-bold text-lg">{item?.card?.info?.name}</h2>
                    <p className="text-gray-900 font-semibold mt-2">
                    ₹{item?.card?.info?.price ? item?.card?.info?.price / 100 : item?.card?.info?.defaultPrice / 100}
                    </p>
                    <p className='flex items-center'><FaStar className={`mr-2 ${item?.card?.info?.ratings?.aggregatedRating?.rating >= 4.0 ? "text-yellow-500" : "text-red-500"}`} /> {item?.card?.info?.ratings?.aggregatedRating?.rating}</p>
                    <p className="text-gray-700">
                      <b className='text-md'></b>{item?.card?.info?.description?.slice(0,200)}
                    </p>
                    
                   
                    <p>{item?.card?.info?.slugs?.restaurant}</p>
                  </div>
                  <div className='w-1/3 text-center'>
                    <img 
                      className="w-full h-36 object-cover rounded-lg mb-4"
                      src={item?.card?.info?.imageId
                        ? `https://media-assets.swiggy.com/swiggy/${item?.card?.info?.imageId}`
                        : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybridM'}
                      alt={item?.card?.info?.name}
                    />
                   <button
  className='bg-green-400 p-0.5 rounded-md w-24 font-semibold transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 '
  onClick={() => {
    dispatch(addToCart({
      Name: item?.card?.info?.name,
      price: item?.card?.info?.price ? item?.card?.info?.price / 100 : item?.card?.info?.defaultPrice / 100,
      img: item?.card?.info?.imageId
        ? `https://media-assets.swiggy.com/swiggy/${item?.card?.info?.imageId}`
        : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybridM',
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
              ))}
            </Accordion>
          );
        }
        return null;
      })}
      <ToastContainer/>
    </div>
  );
}

export default RestaurantMenu;
