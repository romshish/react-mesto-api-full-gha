import { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [formValue, setFormValue] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const userData = useContext(CurrentUserContext);

  useEffect(() => {
    setFormValue({
      name: userData.name,
      description: userData.about,
    })
  }, [userData, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: formValue.name,
      about: formValue.description,
    });
  }

  return (
    <PopupWithForm name={'profile'} title={'Редактировать профиль'} submitTitle={'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-field">
        <input type="text" name="name" value={formValue.name || ''} onChange={handleChange} className="popup__input popup__input_field_name popup__input" id="name-input"
          placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__input-field">
        <input type="text" name="description" value={formValue.description || ''} onChange={handleChange} className="popup__input popup__input_field_job" id="job-input" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="popup__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
