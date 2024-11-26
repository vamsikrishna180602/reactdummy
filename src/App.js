import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantMenu from './Components/RestaurantMenu';
import Search from './Components/Search';
import './App.css'
import Restaurants from './Components/Restaurants';
import Dishes from './Components/Dishes';
import {useState} from 'react';
import CartItems from './Components/CartItems'
import axios from 'axios';
import { useEffect } from 'react';




function App() {

  const[area,setArea] = useState({
    lat: 17.406498,
    lng: 78.47724389999999
  })
  const [locationSearch, setLocationSearch] = useState("");
  const [searchedLocation, setSearchedLocation] = useState([]);
  const [coordinate, setCoordinate] = useState({ lat: 17.406498, lng: 78.47724389999999 });
 
  const geocoordinates = (placeid) => {
    axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeid}`)
      .then((res) => {
        setCoordinate(res?.data?.data[0]?.geometry?.location);
        setArea(res?.data?.data[0]?.geometry?.location);
      });
  };

  useEffect(() => {
    if (locationSearch) {
      axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationSearch}&types=`)
        .then((res) => {
          setSearchedLocation(res?.data?.data);
        });
    }
  }, [locationSearch]);

  return (
    <>
      
        <BrowserRouter>
          <Header locationSearch = {locationSearch}
          setLocationSearch = {setLocationSearch}
          searchedLocation={searchedLocation}
          setSearchedLocation = {setSearchedLocation} 
          geocoordinates= {geocoordinates}
          coordinate = {coordinate}
          setCoordinate = {setCoordinate}/>
          <Routes>
            <Route path='/' element={<Home setArea={setArea} 
          coordinate = {coordinate} />} />
            <Route path='/restaurantMenu/:restName/:restId' element={<RestaurantMenu  />}  />
           <Route path='/search'  element = {<Search  area ={area} locationSearch = {locationSearch} searchedLocation = {searchedLocation}/>}>
             <Route  path='restaurants'  element = { <Restaurants area={area}/>}/>
            <Route  path='dishes'  element = { <Dishes area={area}/>}/>
           </Route>
           <Route path='/CartItems' element= {<CartItems/>} />
          
          </Routes>
        </BrowserRouter>
     
    </>
  );
}

export default App