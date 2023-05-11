function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup ${card.link ? 'popup_opened' : ''} popup_purpose_image`}>
      <div className="popup__wraper">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
