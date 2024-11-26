import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Search(locationSearch,searchedLocation) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div>
        <div className='text-center mt-20 mb-5'>
          <input 
            type='text' 
            placeholder='Search for restaurants and dishes' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='border border-black w-1/2 text-center p-2 rounded-3xl' 
          />
        </div>
        <div>
          <div className='text-center flex gap-5 justify-center container'>
            <NavLink to='/search/restaurants' className='p-1 w-28'>
              <h1>Restaurants</h1>
            </NavLink>
            <NavLink to='/search/dishes' className='p-1 w-24'>
              <h1>Dishes</h1>
            </NavLink>
          </div>
          <Outlet context={{ search }} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Search;
