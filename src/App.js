import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./Components/navbar.js"

import {Shop} from "./Pages/shop/shop"
import {Cart} from "./Pages/cart/cart"
import {BestSellers} from "./Pages/best-sellers/best-sellers";
import {Sales} from "./Pages/sales/books"
import {BookPage} from "./Pages/book-page/book-page";
import {Search} from "./Pages/Search/Search";

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<BestSellers/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/sales" element={<Sales/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/book/:id" element={<BookPage/>}></Route>
        <Route path="/search/:searchString" element={<Search/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
