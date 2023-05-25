import "./App.scss";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import TrackOrder from "./pages/TrackOrder";
import TrackOrderId from "./pages/TrackOrderId";
import Privacy from "./pages/Privacy";
import ContactPage from "./pages/ContactPage";
import Terms from "./pages/Terms";
import Return from "./pages/Return";
import error from "./assets/404.jpg"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/track" element={<TrackOrder />} />
      <Route path="/track/:id" element={<TrackOrderId />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms&conditions" element={<Terms />} />
      <Route path="/privacy&policy" element={<Privacy />} />
      <Route path="/return&refund" element={<Return />} />
      <Route
        path="*"
        element={
          <div className="w-full h-[100vh] head-text app__flex flex-col">
            <img src={error} alt="404 Not Found" className="h-1/2" />
            <p>Page Not Found</p>
            <button className="bg-[var(--secondary-color)] text-white p-text text-lg px-7 py-1 mt-8 hover:bg-[var(--hover-color)] 
              rounded-3xl text-center mx-auto"><Link to="/">Home</Link></button>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
