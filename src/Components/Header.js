import React from 'react';
import { FaOpencart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { LiaSignInAltSolid } from "react-icons/lia";
import { TbHelpSquareRounded } from "react-icons/tb";
import { useSelector } from 'react-redux';


function Header({ locationSearch, setLocationSearch, searchedLocation, geocoordinates, setSearchedLocation }) {
  const totalItemsInCart = useSelector((state) => state.cartItems.length);

  return (
    <header className="shadow-md h-20 flex items-center justify-between px-8 md:px-16">
  
      <Link to="/" className="flex items-center">
        <img
          className="h-12 md:h-14"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_800,h_800/portal/m/logo_192x192.png"
          alt="Swiggy Logo"
        />
      </Link>

  
      <div className="relative w-64 md:w-80">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=' Search Location'
          type="text"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
         
        />
        {locationSearch && searchedLocation?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
            <ol>
              {searchedLocation.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setLocationSearch(item.description);
                    geocoordinates(item.place_id);
                    setSearchedLocation([]);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-100 active:bg-blue-200 transition-colors duration-150 ease-in-out border-b last:border-none border-gray-200"
                >
                  {item.description}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>


      <nav className="flex items-center gap-6 md:gap-10">
        <Link to="/search" className="flex items-center gap-2 px-4 py-2 border border-black rounded-2xl hover:bg-gray-100 transition">
          <FiSearch />
          <span className="hidden md:inline">Search</span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
          <TbHelpSquareRounded />
          <span className="hidden md:inline">Help</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
          <LiaSignInAltSolid />
          <span className="hidden md:inline">Sign In</span>
        </div>
        <Link to="/CartItems" className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
          <FaOpencart />
          <span>Cart-{totalItemsInCart}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
