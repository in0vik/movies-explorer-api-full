import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/utils';
import './Profile.scss';

function Profile({ isLoading, onLogout, onSubmit, isRequestErr, isProfileUpdateSuccess }) {
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLastValues, setIsLastValues] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
    });
    setIsEditMode(!isEditMode);
  }

  function handleEdit(e) {
    e.preventDefault();
    setIsEditMode(!isEditMode);
  }

  useEffect(() => {
    resetForm(currentUser);
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
  }, [values.name, values.email]);

  return (
    <section className="profile">
      <h2 className="profile__greating">Hello, {currentUser.name || 'user'}!</h2>
      <form className="profile__info" onSubmit={handleSubmit}>
        <fieldset className="profile__info-fieldset-wrap">
          <div className="profile__info-item">
            <label className="profile__info-item-title">Name</label>
            <input
              readOnly={!isEditMode || isLoading}
              className="profile__info-item-input"
              type="text"
              name="name"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              value={values.name || ''}></input>
          </div>
          <div className="profile__info-item">
            <label className="profile__info-item-title">E-mail</label>
            <input
              readOnly={!isEditMode || isLoading}
              className="profile__info-item-input"
              type="email"
              name="email"
              onChange={handleChange}
              required
              minLength="4"
              maxLength="320"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={values.email || ''}></input>
          </div>
        </fieldset>
        {isEditMode ? (
          <button
            className={`link button profile__edit-submit-button ${
              !isValid || isLastValues || isLoading ? 'profile__edit-submit-button_disabled' : ''
            }`}
            disabled={!isValid || isLastValues || isLoading}>
            Save
          </button>
        ) : (
          <>
            <div
              className={`profile__request-answer ${isRequestErr && 'profile__request-error'} ${
                isProfileUpdateSuccess && 'profile__request-success'
              } `}>
              {isRequestErr && 'Request error'}{isProfileUpdateSuccess && 'Profile updated'}
            </div>
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
