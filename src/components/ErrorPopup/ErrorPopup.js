import React, { useEffect } from "react";
import './ErrorPopup.css';
import failImage from '../../images/fail-image.svg'

function ErrorPopup({isOpen, onClose}) {
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      };
    }

    document.addEventListener('keyup', closeOnEsc);
    return () => {
      document.removeEventListener('keyup', closeOnEsc);
    }
  }, []);

  function closeOnOverlay(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    };
  }

  return (
    <div className={`popup ${isOpen ?'popup_opened' : ''}`} onClick={closeOnOverlay} >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__image" alt="Сообщение об ошибке" src={failImage} />
        <h2 className="popup__title">Что-то пошло не так...</h2>
      </div>
    </div>
  );
}

export default ErrorPopup;