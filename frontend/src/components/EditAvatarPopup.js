import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const [formValue, setFormValue] = useState({
    avatar: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: formValue.avatar,
    });
  }

  useEffect(() => {
    setFormValue({ avatar: '' });
  }, [isOpen]);

  return (
    <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} submitTitle={'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-field">
        <input type="url" name="avatar" value={formValue.avatar} onChange={handleChange} className="popup__input popup__input_field_link" id="link-avatar"
          placeholder="Ссылка на аватар" required />
        <span className="popup__input-error link-avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
