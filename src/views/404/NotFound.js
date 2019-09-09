import React from 'react';
import { Link } from 'react-router-dom';
import fourOhfour from '../../../public/404.svg';
import './NotFound.scss';

const Notfound = () => (
  <div className="not-found">
    <img src={fourOhfour} alt="404" />
    <h4>
      Sorry, the page you&apos;re looking for was not found
      {' '}
      <Link to="/">
        {' '}
          click here
      </Link>
      {' '}
      to go home
    </h4>
  </div>
);

export default Notfound;
