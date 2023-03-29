import React from 'react';
import './Promo.scss';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Web development student's learning project.</h1>
      <NavTab />
    </section>
  );
}

export default Promo;
