import React from "react";
import { currentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, name, link, likes, card, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(currentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}`
      );

    function handleClickCard() {
        onCardClick({ link, name });
      }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

      return (
            <article id="element__grid">
                <div className="element__grid">
                    {isOwn && <button className="element__basket" type="button" id="element__basket" onClick={handleDeleteClick} />}
                    <img className="element__image" alt={name} src={link} onClick={handleClickCard} />
                    <div className="element__about">
                        <h2 className="element__text">{name}</h2>
                        <div className="element__likes">
                            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                            <p className="element__counter">{likes.length}</p>
                        </div>
                    </div>
                </div>
            </article>
      )
}

export default Card;