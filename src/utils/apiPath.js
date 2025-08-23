// export const BASE_URL = "http://localhost:6161";
export const BASE_URL = "https://plantecommerce.onrender.com";

export const API_PATH = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GET_PROFILE: "/api/auth/profile",
  },
  ADMIN: {},
  USER: {},
  PLANT: {
    GET_ALL_PLANTS: "/api/plant/plants",
    GET_PARTICULAR_PLANT: (plantId) => `/api/plant/plant/${plantId}`,
  },
};
