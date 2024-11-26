import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from "react-icons/md";

function Home({coordinate}) {
 

  
  const [searchedFoodItems, setSearchedFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinate.lat}&lng=${coordinate.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      .then((res) => {
        setSearchedFoodItems(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setLoading(false);
      });
  }, [coordinate]);

 

 
  const shimmerEffect = (
    <div className="animate-pulse">
      <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );

  return (
      <div className="w-[75%] p-6 m-auto ">
        <div>
          <h1 className="text-3xl m-5">Popular Restaurants in Hyderabad</h1>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {loading ? (
              Array(20).fill(0).map((_, index) => (
                <div key={index}>{shimmerEffect}</div>
              ))
            ) : (
              searchedFoodItems?.map((product) => (
                <Link to={`/RestaurantMenu/${product?.info?.name}/${product?.info?.id}`} key={product?.info?.id}>
                  <div>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 group">
  <img
    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${product?.info?.cloudinaryImageId}`}
    className="h-36 w-full object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:opacity-90"
    alt={product?.info?.name}
  />
</div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{product?.info?.name}</h3>
                    <p className="mt-1 text-sm font-medium text-gray-700">{product?.info?.cuisines.slice(0, 3).join(",")}</p>
                    <p className="mt-1 text-sm font-medium text-gray-700 flex items-center">
                      <FaStar className={`mr-2 ${product?.info?.avgRating >= 4.0 ? "text-yellow-500" : "text-red-500"}`} />
                      {product?.info?.avgRating}<span className='ml-3 gap-2 flex items-center'> .<MdDeliveryDining className='text-xl' />{product?.info?.sla?.slaString}</span>
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-700 flex items-center">
                      <FaMapMarkerAlt /> {product?.info?.areaName}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
   
  );
}

export default Home;
