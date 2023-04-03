import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onCloseModal }) {

  useEffect(()=>{
    const handleKeyDoun = (event) => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDoun)

    return ()=>{
      window.removeEventListener('keydown', handleKeyDoun)
    };
  }, [onCloseModal])

  

  const handleClickOverlay = (event) => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleClickOverlay}>
      <div className="Modal">
        {children}
      </div>
    </div>, modalRoot
  );
}
