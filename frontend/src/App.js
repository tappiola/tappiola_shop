import React from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Countries from "./components/country-selector/countries";
import Banner from "./components/banner/banner";

function App() {
  return (
      <div>
          <Header/>
          <Banner/>
          <Countries/>
          <Footer/>
      </div>
  );
}

export default App;
