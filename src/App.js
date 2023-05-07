import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path="*" element={<div className="w-full h-[100vh] head-text app__flex">404 Page Not Found</div>}/>
    </Routes>
  )
}

export default App;
