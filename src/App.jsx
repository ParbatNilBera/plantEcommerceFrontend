import UserProvider from "./context/UserContext";
import MainRoute from "./routes/MainRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div className="font-display">
        <MainRoute className="font-display" />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </UserProvider>
  );
};

export default App;
