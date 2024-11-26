import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../reducer';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  const totalPrice = parseFloat(cartItems.reduce((total, item) => total + item.price, 0).toFixed(2));

  return (
    <div className="m-10 flex justify-between">
      <div className="w-4/5 flex flex-col items-center">
        {cartItems.length === 0 ? (
          <Link to={`/search/dishes`} className="text-center col-span-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your cart is empty!</h2>
              <p className="text-gray-600">Add items to your cart to see them here.</p>
            </div>
          </Link>
        ) : (
          <div className="w-1/2 p-4 rounded-lg bg-gray-50 shadow-lg">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b last:border-none p-4 bg-white hover:bg-gray-100 transition duration-300 m-2 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <img className="w-20 h-20 object-cover rounded-md" src={item.img} alt={item.Name} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.Name}</h3>
                    <p className="text-gray-500 text-sm">{item.restaurant}</p>
                    <p className="text-gray-700">Cost: ₹{item.price}</p>
                  </div>
                </div>
                <button
                  className="border border-black bg-red-600 text-white p-1 rounded-lg font-semibold transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-red-400"
                  onClick={() => {
                    dispatch(removeFromCart(i));
                    toast("Item Removed From Cart", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      style: {
                        color: "white",
                        backgroundColor: "red",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        padding: "12px",
                        textAlign: "center",
                      },
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/4 h-72 p-6 rounded-xl shadow-xl flex flex-col items-center space-y-4 transition-transform transform hover:scale-105 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/random/300x300?food')` }}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="flex flex-col items-center space-y-2 bg-white bg-opacity-60 p-4 rounded-lg">
          <div className="text-gray-700 text-lg font-medium">Items: <span className="font-bold">{cartItems.length}</span></div>
          <div className="text-gray-700 text-lg font-medium">Total: <span className="font-bold">₹{totalPrice}</span></div>
        </div>
        <button className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-transform transform hover:scale-105 active:scale-95">
          Proceed to Checkout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CartItems;
