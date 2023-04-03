import { useState } from "react";
import PropTypes from 'prop-types';
import EditModal from "../Modal/Modal";


export default function ImageGalleryItem({ gallery }) {
  const [selectedItem, setSelectedItem] = useState( null );

  const selectedImageModal = item => {
    setSelectedItem(() => (item ));
  };

  return (

    <ul className="ImageGallery">
      {gallery.map(item => (
        <li className="ImageGalleryItem" key={item.id}>
          <img src={item.webformatURL} alt={item.tags} className="ImageGalleryItem-image" onClick={()=>selectedImageModal(item)} />
          {!!selectedItem && (
          <EditModal onCloseModal={()=>selectedImageModal()}>
            <img src={selectedItem.largeImageURL} alt={selectedItem.tags} />
          </EditModal>)}
        </li>))
      }
    </ul>  
  );
}

ImageGalleryItem.propType = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.node,
      largeImageURL: PropTypes.node,
      tags: PropTypes.string,
    }),
  ),
}
