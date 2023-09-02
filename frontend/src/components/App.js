import '../index.css';
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import { currentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as ApiAuth from '../utils/ApiAuth';
import InfoTooltip from './InfoTooltip';
import success from '../image/success.png';
import fail from '../image/fail.png';

function App() {


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [registrationMessage, setRegistrationMessage] = React.useState({})

  const [headerEmail, setHeaderEmail] = React.useState();

  React.useEffect(() => {
    if(!loggedIn) return;
    api
      .getUserInfoValues()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    if(!loggedIn) return;
    api
      .getInitialCards()
      .then((res) => {
        setCards([...res])
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((res) => {
        setCards([...cards, res])
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .toogleStateLike(card._id, (!isLiked ? 'PUT' : 'DELETE'))
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .handleDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((data) => setCurrentUser(data))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(props) {
    api
      .editAvatar(props.avatar)
      .then((data) => setCurrentUser(data))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleRegisterSubmit({ password, email }) {
    ApiAuth
      .register(password, email)
      .then(() => setRegistrationMessage({ img: success, text: 'Вы успешно зарегистрировались!' }))
      .catch(() => setRegistrationMessage({ img: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => handleInfoTooltip())
  }

  function handleLoginSubmit({ password, email }) {
    ApiAuth
      .authorize(password, email)
      .then((data) => {
          setLoggedIn(true);
      })
      .catch(() => {
        handleInfoTooltip()
        setRegistrationMessage({ img: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
      })
  }

  function handleCheckToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      ApiAuth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setHeaderEmail(data.email);
            handleLoggedIn();
          }
        })
        .catch((err) => console.log(err))
    }
  }

  React.useEffect(() => {
    handleCheckToken();
  })

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  return (

    <div className="page">
      <currentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>

            <Route
              path="*"
              element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />}
            />

            <Route
              path="/signin"
              element={<Login
                onLoginSubmit={handleLoginSubmit}
                loggedIn={loggedIn}
              />}
            />
            <Route
              path="/signup"
              element={<Register
                onRegisterSubmit={handleRegisterSubmit}
                loggedIn={loggedIn}
              />}

            />

            <Route path="/"

              element={<ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={onEditAvatar}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                loggedIn={loggedIn}
                headerEmail={headerEmail}
                onSignOut={signOut}
              />}
            />
          </Routes>
        </BrowserRouter>
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={selectedCard}
        />
        <InfoTooltip
          name={'info'}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={registrationMessage}
        />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;
