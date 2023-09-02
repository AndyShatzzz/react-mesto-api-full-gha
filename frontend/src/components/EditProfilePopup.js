import React from "react";
import PopupWithForm from './PopupWithForm';
import { currentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(currentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
      if(currentUser.name) {
        setName(currentUser.name);
      }
      if(currentUser.about) {
        setDescription(currentUser.about);
      }
      }, [currentUser, isOpen]);

      function handleNameChange(evt) {
        setName(evt.target.value);
      }

      function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
      }


      function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
          });
      }

    return (
       <PopupWithForm 
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            children={<><label className="popup__field">
            <input className="popup__input" type="text" placeholder="Имя" name="name" id="name-input"
                required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
            <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__field">
            <input className="popup__input" type="text" placeholder="О себе" name="about" id="job-input"
                required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
            <span className="popup__input-error job-input-error"></span>
        </label></>}
            
       /> 
    )
}

export default EditProfilePopup;