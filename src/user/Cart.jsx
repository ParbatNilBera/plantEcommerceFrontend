import React, { useEffect, useState } from "react";
import { Trash2, X, ShoppingCart, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { API_PATH } from "../utils/apiPath";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [clearing, setClearing] = useState(false);

  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_PATH.CART.FETCH_CART);
        setCartItems(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Remove single item
  const removeItem = async (itemId, item) => {
    try {
      setRemoving(itemId);

      const res = await axiosInstance.delete(
        API_PATH.CART.REMOVE_ITEM_FROM_CART(itemId),
        { data: { productId: item.productId._id } } // ✅ send body properly
      );

      console.log(res.data);
      setCartItems(cartItems.filter((i) => i._id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setClearing(true);
      await axiosInstance.delete(API_PATH.CART.CLEAR_CART);
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    } finally {
      setClearing(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  );

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 text-white" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Shopping Cart
              </h1>
              <span className="bg-white bg-opacity-20 text-red-400 text-sm px-2 py-1 rounded-full">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={clearCart}
              disabled={clearing}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {clearing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Product Image */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.productId.name}
                      </h3>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.productId.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.productId.description}
                      </p>

                      {/* Price and Quantity */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
                        <span>
                          Price:{" "}
                          <span className="font-medium text-gray-900">
                            ₹{item.productId.price}
                          </span>
                        </span>
                        <span>
                          Quantity:{" "}
                          <span className="font-medium text-gray-900">
                            {item.quantity}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Total & Remove Button */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-3 mt-3 sm:mt-0 sm:ml-6">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{(item.productId.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">Total</div>
                      </div>
                      <button
                        onClick={() => removeItem(item._id, item)}
                        disabled={removing === item._id}
                        className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 disabled:bg-red-25 text-red-600 disabled:text-red-400 font-medium py-2 px-3 rounded-lg transition-colors border border-red-200"
                      >
                        {removing === item._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total */}
        <div className="bg-gray-50 px-4 py-6 sm:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cart Total
              </h3>
              <p className="text-sm text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{totalPrice.toFixed(2)}
              </div>
              <button className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
