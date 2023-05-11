import union from '../images/Union.svg';
import unionErr from '../images/Union_err.svg';

function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''} popup_purpose_notice`}>
      <div className="popup__wraper popup__wraper_purpose_notice">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__union" src={isRegistered ? union : unionErr} alt="" />
        <h2 className="popup__title-notice">{isRegistered ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip;
