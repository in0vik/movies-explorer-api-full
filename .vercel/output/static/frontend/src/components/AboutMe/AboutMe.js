import React from 'react';
import './AboutMe.scss';

function AboutMe() {
  return (
    <section className="about-me" id="aboutme">
      <h2 className="subtitle about-me__title">About Me</h2>
      <div className="about-me__main-block">
        <p className="about-me__name">Ilya Novik</p>
        <p className="about-me__job">Fullstack developer, 28 yo</p>
        <p className="about-me__description">
          I'm a Frontend engineer with background in music, film production, and visual arts. I have
          a range of soft skills such as problem-solving, adaptability, communication, teamwork, and
          excellent organizational skills. I'm proficient in JavaScript, TypeScript, React, Node.js,
          Express.js, Webpack, MongoDB, CSS, HTML, GIT, and BEM. I'm eager to develop my career in
          the next 5 years and ready to seize any opportunities that come my way.
        </p>
        <a
          href="https://github.com/in0vik"
          target="_blank"
          rel="noreferrer"
          className="link about-me__github">
          Github
        </a>
        <img
          className="about-me__photo"
          src="https://i.postimg.cc/kMKm4pqk/Untitled-1.jpg"
          alt="Фото Студента"
        />
      </div>
    </section>
  );
}

export default AboutMe;
