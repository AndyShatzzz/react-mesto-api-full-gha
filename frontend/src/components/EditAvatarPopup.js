import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarInputRef = React.useRef({});
    const [avatarLink, setAvatarLink] = React.useState('');

    React.useEffect(() => {
      resetForm();
  }, [isOpen]);

    function resetForm() {
      setAvatarLink('')
    }

    function handleAvatarChange(evt) {
      setAvatarLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarInputRef.current.value,
        });
      } 

    return (
       <PopupWithForm 
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            children={<label className="popup__field">
            <input className="popup__input" type="url" placeholder="Ссылка на картинку" name="link"
                id="avatar-input" required value={avatarLink} ref={avatarInputRef} onChange={handleAvatarChange} />
            <span className="popup__input-error avatar-input-error"></span>
        </label>}
            
       /> 
    )
}

export default EditAvatarPopup;