import logoPath from '../images/Vector.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ email, handleSignOut }) {
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
      <Routes>
        <Route exact path="/" element={
          <div className="header__wrapper">
            <p className="header__user">{email}</p>
            <button className="header__logout" onClick={handleSignOut}>Выйти</button>
          </div>} />
        <Route path="/sign-in" element={
          <Link className="header__auth-link" to="/sign-up">Регистрация</Link>} />
        <Route path="/sign-up" element={
          <Link className="header__auth-link" to="/sign-in">Войти</Link>} />
      </Routes>
    </header >
  );
}

export default Header;



