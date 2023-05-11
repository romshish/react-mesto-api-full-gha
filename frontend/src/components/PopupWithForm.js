function PopupWithForm({ name, title, submitTitle, isOpen, onClose, onSubmit, ...props }) {

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''} popup_purpose_${name}`}>
      <div className={`popup__wraper popup__wraper_purpose_${name}`}>
        <form name={`${name}-form`} className="popup__form" onSubmit={onSubmit} >
          <h2 className="popup__title">{title}</h2>
          <button type="button" onClick={onClose} className="popup__close"></button>
          {props.children}
          <button className="popup__submit" type="submit">{submitTitle}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
