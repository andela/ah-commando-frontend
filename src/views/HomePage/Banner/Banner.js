import React from 'react';
import connectComponent from '@App/lib/connect-component';
import { openModal } from '@Actions/uiActions';
import Button from '@Components/Button';
import { PropTypes } from 'prop-types';
import './banner.style.scss';

const style = {
  width: '10vw',
  height: '6vh',
  color: 'black',
  backgroundColor: 'white',
};

export const Banner = ({ signUp }) => (
  <article className="banner" data-test="bannerComponent">
    <div className="bannerCta">
      <h1>Follow the Adventure Everywhere</h1>
      <p className="bannerText">Join Authors&#39; Haven and share your adventures with the world</p>
      <Button handleClick={() => signUp('signup')} label="Sign up" style={style} type="button" datatest="BannerButtontest" />
    </div>
  </article>
);

Banner.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connectComponent(Banner, {
  signUp: openModal,
});
