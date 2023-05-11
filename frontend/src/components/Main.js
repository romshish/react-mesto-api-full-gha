import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import { useContext } from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__wrapper" onClick={onEditAvatar} >
          <img className="profile__avatar" src={`${currentUser.avatar}`} alt="" />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" onClick={onEditProfile} className="profile__button-edit"></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
      </section>

      <section className="elements page__section" aria-label="Подборка фотографий автора">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} title={card.name} likes={card.likes.length} src={card.link} onCardClick={onCardClick} card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
