import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as auth from '../utils/auth.js';
import { api } from '../utils/Api';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUseremail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [infoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-up', { replace: true });
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api.getAllNeededData()
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`);
        });
    }
  }, [isLoggedIn]);


  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (localStorage.getItem('jwt')) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setUseremail(res.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true })
        }
      })
        .catch((err) => {
          console.log(`Произошла ошибка ${err}`);
        });
    }
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setUseremail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegister(password, email) {
    auth.register(password, email).then((res) => {
      if (res) {
        setIsRegistered(true);
        setIsInfoToolTipOpen(true);
        navigate('/sign-up', { replace: true });
      } else {
        setIsRegistered(false);
        setIsInfoToolTipOpen(true);
      }
    })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
  }

  function handleUpdateUser(data) {
    api.updateProfile({ name: data.name, about: data.about })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateProfileAvatar({ avatar: data.avatar })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => {
      return id === currentUser._id;
    })

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => {
            return c._id !== card._id;
          })
        });
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoToolTipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header email={userEmail} handleSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={<ProtectedRoute
              loggedIn={isLoggedIn} component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />} />
            <Route path="/sign-up" element={<Login onLogin={handleLogin} onLoginedIn={setUseremail} />} />
            <Route path="/sign-in" element={<Register onRegister={handleRegister} />} />
          </Routes>
          <Footer />
          <InfoTooltip isOpen={infoToolTipOpen} onClose={closeAllPopups} isRegistered={isRegistered} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <PopupWithForm name={'confirm'} title={'Вы уверены?'} submitTitle={'Да'} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
