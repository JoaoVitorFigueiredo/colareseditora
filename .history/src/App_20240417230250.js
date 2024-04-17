import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {createContext, useState} from "react";

import Navbar from "./Components/navbar/navbar.js"
import Footer from "./Components/footer/footer.js"

import {Shop} from "./Pages/shop/shop"
import {Cart} from "./Pages/cart/cart"
import {BestSellers} from "./Pages/best-sellers/best-sellers";
import {Sales} from "./Pages/sales/books"
import {BookPage} from "./Pages/book-page/book-page";
import {Search} from "./Pages/search/search.js";

import {NotFoundPage} from './NotFoundPage';


export const CartContext = createContext({books:[],total:0,volume:0})

function App() {
  const [cart, setCart] = useState({books:[],total:0,volume:0})

  return (
    <div className="App">
      <CartContext.Provider value={{cart,setCart}}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<BestSellers/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/sales" element={<Sales/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/book/:id" element={<BookPage/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
      </Routes>
      <Footer/>
    </Router>
        </CartContext.Provider>
    </div>

  );
}

export default App;
