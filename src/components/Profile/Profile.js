import React, { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/utils';
import './Profile.scss';

function Profile({ isLoading, onLogout, onSubmit, isRequestErr }) {
  const { values, handleChange, isValid } = useFormWithValidation();
  const [isEditMode, setIsEditMode] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: values.name ? values.name : currentUser.name,
      email: values.email ? values.email : currentUser.email,
    });
    setIsEditMode(!isEditMode);
  }

  function handleEdit(e) {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }


  // useEffect(() => {
  //   if (isRequestErr) {
  //     console.log('errrrrrr');
  //     values.name = currentUser.name;
  //     values.email = currentUser.email;
  //   }
  // }, [isRequestErr])

  return (
    <section className="profile">
      <h2 className="profile__greating">Hello, {currentUser.name || 'user'}!</h2>
      <form className="profile__info" onSubmit={handleSubmit}>
        <fieldset className="profile__info-fieldset-wrap">
          <div className="profile__info-item">
            <label className="profile__info-item-title">Name</label>
            <input
              readOnly={!isEditMode}
              className="profile__info-item-input"
              type="text"
              name="name"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              value={values.name || currentUser.name || ''}></input>
          </div>
          <div className="profile__info-item">
            <label className="profile__info-item-title">E-mail</label>
            <input
              readOnly={!isEditMode}
              className="profile__info-item-input"
              type="email"
              name="email"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={values.email || currentUser.email || ''}></input>
          </div>
        </fieldset>
        {isEditMode ? (
          <button
            className={`link button profile__edit-submit-button ${
              isValid ? '' : 'profile__edit-submit-button_disabled'
            }`}
            disabled={!isValid}>
            Save
          </button>
        ) : (
          <>
            <div className="profile__request-error">{isRequestErr ? 'Request error' : ''}</div>
            <button
              className={`link button profile__edit-button ${
                isValid ? '' : 'profile__edit-button_disabled'
              }`}
              onClick={handleEdit}>
              Edit
            </button>
            <button className="link button profile__logout-button" onClick={onLogout}>
              Log out
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
