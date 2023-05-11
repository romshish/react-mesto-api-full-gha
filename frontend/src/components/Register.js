import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegister }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(password, email);
  }

  return (
    <form className="enty__form" onSubmit={handleSubmit} >
      <h2 className="enty__title">Регистрация</h2>
      <label className="enty__input-field">
        <input type="text" name="email" className="enty__input enty__input_field_enty-email" value={formValue.email} onChange={handleChange} id="enty-email-input" placeholder="Email" minLength="2" maxLength="30" required />
        <span className="enty__input-error enty-email-input-error"></span>
      </label>
      <label className="enty__input-field">
        <input type="password" name="password" className="enty__input enty__input_field_password" value={formValue.password} onChange={handleChange} id="password-input" placeholder="Пароль" required />
        <span className="enty__input-error password-input-error"></span>
      </label>
      <button className="enty__submit" type="submit">Зарегистрироваться</button>
      <p className="enty__question">Уже зарегистрированы? <Link to="/sign-up" className="enty__link">Войти</Link></p>
    </form>
  );
}

export default Register;
