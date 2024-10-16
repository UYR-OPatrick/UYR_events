import './App.css';
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Events from './Pages/Events';
import Products from './Pages/Products';
import ProductInfo from './Pages/ProductInfo';
import Contacts from './Pages/Contacts';
import EditEvent from './Pages/EditEvent';
import Basket from './Pages/Basket';
import SignIn from './Pages/SignIn';

export const BasketContext = createContext();

function App() {
  const [basket, setBasket] = useState([])

  return (
    <BrowserRouter>
    <BasketContext.Provider value={[basket, setBasket]}>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id/edit' element={<EditEvent />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id/info' element={<ProductInfo />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
      <Footer/>
    </BasketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
