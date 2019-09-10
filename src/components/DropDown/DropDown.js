/* eslint-disable react/prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './DropDown.style.scss';
import back from '../../../public/Rectangle.png';


export function DropDown({ type }) {
  return (
    <section
      style={type === 'notification'
        ? { right: '72%' } : { right: '7%' }}
      className="dropdownSection"
    >
      <section className="dropDown">
        <img src={back} alt="" />
        <div className="dropDowncontainer">
          <Link to="/">
            <h2>NOTIFICATIONS</h2>
          </Link>
          <div className="dropDowncontent">
            <div className="notify">
              <h3>Notification header</h3>
              <div className="content">
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
                  necessitatibus?
                </p>
                <div className="date"><p>date date</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default withRouter(DropDown);
