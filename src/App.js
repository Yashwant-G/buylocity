import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import TrackOrder from "./pages/TrackOrder";
import TrackOrderId from "./pages/TrackOrderId";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/track" element={<TrackOrder />} />
      <Route path="/track/:id" element={<TrackOrderId />} />
      <Route
        path="*"
        element={
          <div className="w-full h-[100vh] head-text app__flex">
            404 Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;
