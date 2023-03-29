import 'normalize.css';
import './App.scss';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import * as api from '../../utils/MainApi';
import React, { useContext, useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRequestErr, setIsRequestErr] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isProfileUpdateSuccess, setIsProfileUpdateSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  
  function checkToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      api
        .getUserContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLikeMovie(movie) {
    api
      .postMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeleteMovie(movieId) {
    api.deleteMovie(movieId).then(() => {
      setSavedMovies((storedMovies) => storedMovies.filter((movie) => movie._id !== movieId));
    });
  }

  function onRegister({ email, password, name }) {
    setIsLoading(true);
    api
      .register(email, password, name)
      .then(() => {
        onAuth({ email, password });
      })
      .catch((error) => {
        setIsRequestErr(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onAuth({ email, password }) {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((error) => {
        setIsRequestErr(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onProfileUpdate(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        setIsProfileUpdateSuccess(true);
        setCurrentUser(data);
        setIsRequestErr(false);
      })
      .catch((error) => {
        setIsProfileUpdateSuccess(false);
        setIsRequestErr(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(data);
      });
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('isShort');
    localStorage.removeItem('isShortSavedMovies');
    localStorage.removeItem('filtredMovies');
    localStorage.removeItem('query');
    localStorage.removeItem('querySavedMovies');
    navigate('/');
  }

  useEffect(() => {
    api
      .getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
            exact
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Movies
                    onSaveFilm={handleLikeMovie}
                    onDeleteFilm={handleDeleteMovie}
                    savedMovies={savedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <SavedMovies
                    onSaveFilm={handleLikeMovie}
                    onDeleteFilm={handleDeleteMovie}
                    savedMovies={savedMovies}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Profile
                    onSubmit={onProfileUpdate}
                    isRequestErr={isRequestErr}
                    onLogout={onLogout}
                    isProfileUpdateSuccess={isProfileUpdateSuccess}
                  />
                </>
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/signin"
            element={
              <Login
                isLoading={isLoading}
                onAuth={onAuth}
                isRequestErr={isRequestErr}
                setIsRequestErr={setIsRequestErr}
              />
            }
            exact
          />
          <Route
            path="/signup"
            element={
              <Register
                isLoading={isLoading}
                onRegister={onRegister}
                isRequestErr={isRequestErr}
                setIsRequestErr={setIsRequestErr}
              />
            }
            exact
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
