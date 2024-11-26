
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationSearch({ setCoordinate, setArea }) {
  const [locationSearch, setLocationSearch] = useState("");
  const [searchedLocation, setSearchedLocation] = useState([]);

  useEffect(() => {
    if (locationSearch) {
      axios
        .get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationSearch}&types=`)
        .then((res) => {
          setSearchedLocation(res?.data?.data);
        });
    }
  }, [locationSearch]);

  const geocoordinates = (placeid) => {
    axios
      .get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`)
      .then((res) => {
        const location = res?.data?.data[0]?.geometry?.location;
        setCoordinate(location);
        setArea(location);
      });
  };

  return (
    <div className="w-[20%] p-10 text-center">
      <h1 className="text-3xl">Location Search</h1>
      <input
        className="m-5 border border-black rounded-lg p-1"
        placeholder="Search Location"
        type="text"
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
      />
      <div>
        <ol className="ml-5">
          {searchedLocation?.map((item, i) => (
            <li
              key={i}
              onClick={() => geocoordinates(item?.place_id)}
              className="cursor-pointer py-2 px-4 bg-white hover:bg-gray-100 border-b border-gray-200"
            >
              {item.description}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default LocationSearch;
