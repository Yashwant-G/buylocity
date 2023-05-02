import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Slider from "./components/Slider/Slider";
import Slogan from "./components/Slogan/Slogan";
import Product from "./components/Product/Product";
import About from "./components/About/About";
import Testimonial from "./components/Testimonial/Testimonial";
import Contact from "./components/Contact/Contact";
import Serving from "./components/Serving/Serving";

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Slider/>
      <Slogan/>
      <Product/>
      <Serving/>
      <About/>
      <Testimonial/>
      <Contact/>
    </div>
  )
}

export default App;
