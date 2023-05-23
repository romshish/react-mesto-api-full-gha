import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ title, likes, src, onCardClick, card, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleClickLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === userId;

  const isLiked = card.likes.some((i) => {
    return i._id === userId;
  })

  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

  return (
    <li className="element">
      <img className="element__image" src={src} alt={title} onClick={handleClick} />
      {isOwn && <button type="button" className="element__trash" onClick={handleDeleteClick} />}
      <div className="element__info">
        <h2 className="element__title">{title}</h2>
        <div className="element__title-wrapper">
          <button type="button" className={cardLikeButtonClassName} onClick={handleClickLike}></button>
          <p className="element__sum-likes">{likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
