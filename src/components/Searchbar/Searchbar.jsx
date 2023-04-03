import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';


export default function Searchbar({title, onSubmit}) {
  const [colectionNameImages, setColectionNameImages] = useState('');

  const handleChangeImages = event => {
    setColectionNameImages( event.currentTarget.value )
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (colectionNameImages.trim() === "") {
      return toast.warn("Введіть запит пошуку")
    }

    onSubmit(colectionNameImages);
    setColectionNameImages( '' );
  }

  return (
    <header className="Searchbar" >
      <form className="SearchForm" onSubmit={handleSubmit} >
        <button type="submit" className="SearchForm-button">
          <ImSearch  />
          <span className="SearchForm-button-label">{title}</span>
        </button>

        <input
          className="SearchForm-input"
          name="colectionImages"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={colectionNameImages}
          onChange={handleChangeImages}
        />
      </form>
    </header>
  )
}


Searchbar.propType = {
  title: PropTypes.string,
}