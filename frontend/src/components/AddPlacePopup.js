import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);

    function handleNameChange(evt) {
            setName(evt.target.value);
    }

    function handleLinkChange(evt) {
            setLink(evt.target.value);
    }

    function resetForm() {
        setName('');
        setLink('');
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlaceSubmit({
            name: name,
            link: link,
        })
    }

    return (
       <PopupWithForm 
            name='add-card'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Создать'
            onSubmit={handleSubmit}
            children={<><label className="popup__field">
                <input className="popup__input" type="text" placeholder="Название" name="name" id="place-input"
                    required minLength="2" maxLength="30" onChange={handleNameChange} value={name} />
                <span className="popup__input-error place-input-error"></span>
            </label><label className="popup__field">
                    <input className="popup__input" type="url" placeholder="Ссылка на картинку" name="link"
                        id="link-input" required onChange={handleLinkChange} value={link} />
                    <span className="popup__input-error link-input-error"></span>
                </label></>}
            
       /> 
    )
}

export default AddPlacePopup;