import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";


export default function App() {
  const [searchNameImages, setSearchNameImages] = useState('');

  const handleSubmit = colectionNameImages => {
    setSearchNameImages( colectionNameImages )
  }

  return (
    <div className="App">
      <Searchbar title={'Search'} onSubmit={handleSubmit} />

      <ImageGallery nameImages={searchNameImages} />

      <ToastContainer autoClose={3000} />
      
    </div>
  )
}


Searchbar.propType = {
  title: PropTypes.string,
}
