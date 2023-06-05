import React from 'react';
import './Techs.scss';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="subtitle techs__title">Technologies</h2>
      <div className="techs__main-block">
        <p className="techs__big-text">7 technologies</p>
        <p className="techs__text">
          In the web development course, we learned the techniques that we applied in the diploma
          project.
        </p>
        <div className="techs__list">
          <div className="techs__item">
            <p className="techs__item-text">HTML</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">CSS</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">JS</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">React</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">Git</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">Express.js</p>
          </div>
          <div className="techs__item">
            <p className="techs__item-text">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;
