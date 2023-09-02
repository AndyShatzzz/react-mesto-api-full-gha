import React from 'react';

const InfoTooltip = ({ name, isOpen, onClose, message }) => {
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
    <>
      <div className={`popup popup__info-registration ${isOpen && 'popup_opened'}`} onClick={handleOverlay}>
        <div className={`popup__container popup__container_type_${name} popup__overlay`}>
          <form className={`popup__form popup__form_type_${name}`} name={`${name}-form`} method="post" id={`${name}-form`}>
            <fieldset className="popup__set">
              <img className='popup__info-image' alt='Картинка статуса' src={message.img} />
              <h2 className="popup__info-title">{message.text}</h2>
            </fieldset>
          </form>
          <button className="popup__close popup__close_type_add-card" onClick={onClose} type="button"></button>
        </div>
      </div>
    </>
  )
}

export default InfoTooltip; 