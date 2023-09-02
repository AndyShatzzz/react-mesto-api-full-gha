import React from "react";


function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
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
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleOverlay}>
            <div className={`popup__container popup__container_type_${name} popup__overlay`}>
                <form className={`popup__form popup__form_type_${name}`} name={`${name}-form`} method="post" id={`${name}-form`}
                    onSubmit={onSubmit} >
                    <fieldset className="popup__set">
                        <h2 className="popup__title">{`${title}`}</h2>
                        {children}
                        <button className='popup__submit' type="submit"
                            id={`submit__${name}`}>{buttonText}</button>
                    </fieldset>
                </form>
                <button className="popup__close popup__close_type_add-card" onClick={onClose} type="button"></button>
            </div>
        </div>
    );
}

export default PopupWithForm;