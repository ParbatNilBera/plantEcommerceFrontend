import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Plants from "../pages/Plants";
import PlantDetails from "../pages/PlantDetails";
import EditProfile from "../pages/EditProfile";
import EditAddress from "../pages/EditAddress";
const MainRoute = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/editAddress" element={<EditAddress />} />
          <Route path="/plants/:plantId" element={<PlantDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoute;
