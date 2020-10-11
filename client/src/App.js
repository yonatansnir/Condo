import React from 'react';
import Cart from './component/Cart/Cart';
import Details from './component/Details/Details';
import Navbar from './component/Navbar/Navbar';
import ProductList from './component/ProductList/ProductList';

function App() {
  return (
    <>
      <Navbar
        woman='Woman'
        men='Man'
        boys='Boys'
        girls='Girls'
        lingerie='Lingerie'
        home='Home'
        furniture='Furniture'
        beauty='Beauty'
        brands='Brands'
      />
      <ProductList />
      <Details />
      <Cart />
    </>
  );
}

export default App;
