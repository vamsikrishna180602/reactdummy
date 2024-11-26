import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Restaurants({ area }) {
  const [ResItems, setResItems] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const { search } = useOutletContext();

  useEffect(() => {
    if (search) {
      setLoading(true); 
      axios
        .get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${area.lat}&lng=${area.lng}&str=${search}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=181a64ea-9b53-f5c2-fb99-84a451867b15`)
        .then((res) => {
          setSearchResults(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[0]?.card?.card?.info || null);
          setResItems(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants || []);
          console.log(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants || []);
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
    <div className="p-2 rounded-xl bg-white shadow mb-6 w-full lg:w-2/3 animate-pulse">
      <div className="flex p-2 rounded-xl bg-gray-100 shadow gap-4">
        <div className="w-1/3 h-40 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-[60%] mx-auto'>
      {isSearched ? (
        <>
          {loading ? (
           
            <Shimmer />
          ) : (
            <Link to={`/RestaurantMenu/${searchResults?.name}/${searchResults?.id}`}>
              {searchResults ? (
                <div className='p-2 rounded-xl bg-white shadow mb-6 w-full lg:w-2/3 hover:bg-gray-50 transition duration-300'>
                  <h2 className='text-xl font-semibold mb-3'>Your Search</h2>
                  <div className='flex p-2 rounded-xl bg-gray-100 shadow gap-4'>
                    <div className="w-1/3 overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={searchResults?.cloudinaryImageId 
                          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${searchResults?.cloudinaryImageId}`
                          : 'https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?semt=ais_hybrid'} 
                        alt={searchResults?.name || 'Fallback Image'} 
                        className="h-40 w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className='ml-4 flex flex-col '>
                      <p className='text-lg font-semibold'>{searchResults?.name}</p>
                      <p className='text-gray-700 text-md'>{searchResults?.cuisines?.join(', ')}</p>
                      <p className='text-gray-700 text-md flex items-center gap-2'>
                        Rating: <FaStar className={`mr-2 ${searchResults?.avgRating >= 4.0 ? "text-yellow-500" : "text-red-500"}`} /> {searchResults?.avgRating}
                      </p>
                      <p className='text-gray-700 text-md'>Delivery Time: {searchResults?.sla?.deliveryTime} mins</p>
                      <p className='text-gray-700 text-md'>{searchResults?.areaName}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className='text-center text-gray-700 mt-6'>No exact match found for "{search}"</p>
              )}
            </Link>
          )}
          <h2 className='text-xl font-semibold mt-8 mb-4'>More Restaurants</h2>
          {loading ? (
            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 mt-6'>
              {Array(8).fill(0).map((_, i) => (
                <Shimmer key={i} />
              ))}
            </div>
          ) : (
            ResItems.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4 mt-6'>
                {ResItems.map((item, i) => (
                  <Link to={`/RestaurantMenu/${item?.info?.name}/${item?.info?.id}`} key={i}>
                    <div className='p-2 rounded-xl bg-white shadow mb-3 w-full hover:bg-gray-50 transition duration-300'>
                      <div className='flex p-2 rounded-xl bg-gray-50 shadow'>
                        <div className="h-36 w-32 overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={item?.info?.cloudinaryImageId 
                              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`
                              : 'https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?semt=ais_hybrid'} 
                            alt={item?.info?.name || 'Fallback Image'} 
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <div className='ml-4 flex flex-col '>
                          <p className='text-lg font-semibold'>{item?.info?.name} </p>
                          <p className='text-gray-700 text-md'>{item?.info?.cuisines?.slice(0, 3)?.join(', ')}</p>
                          <p className='text-gray-700 text-md flex items-center gap-2'>
                            Rating: <FaStar className={`mr-2 ${item?.info?.avgRating >= 4.0 ? "text-yellow-500" : "text-red-500"}`} /> {item?.info?.avgRating}
                          </p>
                          <p className='text-gray-700 text-md'>Delivery Time: {item?.info?.sla?.deliveryTime} mins</p>
                          <p className='text-gray-700 text-md'>{item?.info?.areaName}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className='text-center text-gray-700 mt-6'>No additional restaurants found</p>
            )
          )}
        </>
      ) : (
        <p className='text-center text-gray-700 mt-6'>Search for a restaurant to see results</p>
      )}
    </div>
  );
}

export default Restaurants;
