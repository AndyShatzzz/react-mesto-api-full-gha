import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
    React.useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }


    return (
    <div className={`popup popup_type_img-fullscreen ${card ? 'popup_opened' : ''}`} onClick={handleOverlay}>
        <div className="popup__img-container popup__overlay">
            <img className="popup__image" alt={card ? card.name : '#'} src={card ? card.link : '#'} />
            <p className="popup__text">{card ? card.name : '#'}</p>
            <button className="popup__close popup__close_type_img-fullscreen" type="button" onClick={onClose}></button>
        </div>
    </div>
    );
  }
  
  export default ImagePopup;