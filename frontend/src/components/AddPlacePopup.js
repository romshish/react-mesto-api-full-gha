import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [formValue, setFormValue] = useState({
    title: '',
    link: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: formValue.title,
      link: formValue.link,
    });
  }

  useEffect(() => {
    setFormValue({
      title: '',
      link: '',
    })
  }, [isOpen]);

  return (
    <PopupWithForm name={'card'} title={'Новое место'} submitTitle={'Создать'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-field">
        <input type="text" name="title" value={formValue.title} onChange={handleChange} className="popup__input popup__input_field_placename" id="placename-input"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error placename-input-error"></span>
      </label>
      <label className="popup__input-field">
        <input type="url" name="link" value={formValue.link} onChange={handleChange} className="popup__input popup__input_field_link" id="link-input"
          placeholder="Ссылка на картинку" required />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;

