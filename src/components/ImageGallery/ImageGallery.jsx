
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY ='33450738-a5a6f333e8e5416cd1742bc4b'
const Status = {
  IDLE: 'idle',
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: 'rejected',
};


export default function ImageGallery({ nameImages }) {
  const [ search, setSearch ] = useState(null);
  const [ colectionImages, setColectionImages ] = useState( null );
  const [ page, setPage ] = useState( 1 );
  const [ total, setTotal ] = useState( null );
  const [ isEndImages, setIsEndImages ] = useState( null );
  const [ status, setStatus ] = useState(Status.IDLE);
  const [ error, setError ] = useState( null );

  const handleBtnSubmitMore = () => {
    setPage(prevState => prevState + 1)
  };

  useEffect(()=>{
    if (!nameImages) return;

    setStatus(Status.PENDING);
    const isPromptUpdated = nameImages !== search;
  
    
    fetch(`${BASE_URL}?q=${nameImages}&page=${isPromptUpdated ? 1 : page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => { if (response.ok) { return response.json() } return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${nameImages}`)) })
      .then(colectionImages => {
        if (colectionImages.total !== 0 && page === 1) {
          setColectionImages(colectionImages.hits)
          setTotal(colectionImages.totalHits)
          setIsEndImages(false)
          setStatus(Status.RESOLVED)
          setSearch(nameImages)
        } else if (total !== 0 && page > 1 && !isPromptUpdated) { 
            setColectionImages(prevState => [...prevState, ...colectionImages.hits])
            setPage(isPromptUpdated ? 1 : page)
            setTotal(colectionImages.totalHits)
            setError(null)
            setIsEndImages(isPromptUpdated ? false : colectionImages.hits.length < 12)
            setStatus(Status.RESOLVED)
          } else if (total !== 0 && page > 1) {
              isPromptUpdated && window.scroll(0,0);
              setColectionImages(prev=> (isPromptUpdated ?colectionImages.hits : [...prev, ...colectionImages.hits]))
              setPage(isPromptUpdated ? 1: page)
              setIsEndImages(prev=> (isPromptUpdated ? false : prev)) 
              setStatus(Status.RESOLVED)
            } else return Promise.reject(new Error(`Не вдалося знайти даних по вашому запиту ${nameImages}`))
          })
          .catch(error=> {
            setError(error)
            setStatus(Status.REJECTED)
          })
        }, [nameImages, page, search, total])

    if (status === 'idle') {
      return <p>Введіть запит для пошуку</p>
    }

    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryItem gallery={colectionImages} />
          { !isEndImages && <Button onBtnSubmit={handleBtnSubmitMore}/>}
        </div>
      )
    }

    if (status === 'pending' && page === 1) {
      return <Loader />
    } else if (status === 'pending' && page > 1) {
      return (
        <div>
          <ImageGalleryItem gallery={colectionImages} />
          <Loader />
        </div>
      )
    }

      if (status === 'rejected') {
        return <h2>{error.message}</h2>
      }
    }




ImageGallery.propType = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.node,
      largeImageURL: PropTypes.node,
      tags: PropTypes.string,
    }),
  ),
}