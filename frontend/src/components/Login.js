import { useState } from 'react';

function Login({ onLogin }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    onLogin(formValue.email, formValue.password);
    setFormValue({
      email: '',
      password: ''
    });
  }


  return (
    <form className="enty__form" onSubmit={handleSubmit}>
      <h2 className="enty__title">Вход</h2>
      <label className="enty__input-field">
        <input type="text" name="email" className="enty__input enty__input_field_enty-email" value={formValue.email} onChange={handleChange} id="enty-email-input"
          placeholder="Email" minLength="2" maxLength="30" required />
        <span className="enty__input-error enty-email-input-error"></span>
      </label>
      <label className="enty__input-field">
        <input type="password" name="password" className="enty__input enty__input_field_password" value={formValue.password} onChange={handleChange} id="password-input"
          placeholder="Пароль" required />
        <span className="enty__input-error password-input-error"></span>
      </label>
      <button className="enty__submit" type="submit">Войти</button>
    </form>
  );
}

export default Login;
