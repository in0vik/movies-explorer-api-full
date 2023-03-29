import React from 'react';
import './AboutProject.scss';

function AboutProject() {
  return (
    <section className="about-project" id="aboutproject">
      <h2 className="subtitle about-project__title">About project</h2>
      <div className="about-project__description">
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">
            The diploma project consisted of 5 phases
          </h3>
          <p className="about-project__description-text">
            Drawing up the plan, working on the backend, the layout, adding functionality and final
            refinements.
          </p>
        </div>
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">The diploma took 5 weeks to complete</h3>
          <p className="about-project__description-text">
            Each stage had soft and hard deadlines that had to be met in order to successfully
            defend themselves.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <p className="about-project__timeline-item about-project__timeline-item_type_first-part">
          1 week
        </p>
        <p className="about-project__timeline-item about-project__timeline-item_type_second-part">
          4 week
        </p>
        <p className="about-project__timeline-item about-project__timeline-item_type_description">
          Back-end
        </p>
        <p className="about-project__timeline-item about-project__timeline-item_type_description">
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;
