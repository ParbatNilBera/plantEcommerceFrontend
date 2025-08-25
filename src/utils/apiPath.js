// export const BASE_URL = "http://localhost:6161";
export const BASE_URL = "https://plantecommerce.onrender.com";

export const API_PATH = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GET_PROFILE: "/api/auth/profile",
    ADMIN_LOGIN: "/api/auth/login-admin",
  },
  CART: {
    FETCH_CART: "/api/cart/",
    ADD_TO_CART: "/api/cart/add",
    REMOVE_ITEM_FROM_CART: (itemId) => `/api/cart/${itemId}`,
    CLEAR_CART: "/api/cart/",
  },
  USER: {
    UPDATE_PROFILE: "/api/user/edit-profile",
    UPDATE_ADDRESS: "/api/user/edit-address",
    GET_ADDRESS: "/api/user/addresses",
  },
  PLANT: {
    GET_TOP_PLANTS: "/api/plant/top-plants",
    GET_ALL_PLANTS: "/api/plant/plants",
    GET_PARTICULAR_PLANT: (plantId) => `/api/plant/plant/${plantId}`,
    CREATE_PLANT: "/api/plant/plant",
    UPDATE_PLANT: (plantId) => `/api/plant/plant/${plantId}`,
    DELETE_PLANT: (plantId) => `/api/plant/plant/${plantId}`,
  },
};
