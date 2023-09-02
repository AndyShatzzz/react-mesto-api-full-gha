import React from "react";
import Card from './Card';
import { currentUserContext } from '../contexts/CurrentUserContext';
import Header from "./Header";
import Footer from "./Footer";


function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete, onAddPlaceSubmit, headerEmail, onSignOut }) {

    const currentUser = React.useContext(currentUserContext);

    return (
        <>
            <Header
                headerEmail={headerEmail}
                onSignOut={onSignOut}
            />
            <main className="content">
                <section className="profile">
                    <button className="profile__avatar-edit" onClick={onEditAvatar} type="button">
                        <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
                    </button>
                    <div className="profile__info">
                        <div className="profile__row-top">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
                </section>

                <section className="element" id="el__card">
                    {cards.toReversed().map((item) => (
                        <Card key={item._id}
                            onCardClick={onCardClick}
                            name={item.name}
                            link={item.link}
                            likes={[...item.likes]}
                            card={item}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            onAddPlaceSubmit={onAddPlaceSubmit}
                        />
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Main;