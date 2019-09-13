/* eslint-disable react/prop-types */
import React from 'react';

const Drop = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 390 524" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_bdd)">
      <path d="M4.5083 55.4643C4.5083 51.046 8.09002 47.4643 12.5083 47.4643H79.3917C83.81 47.4643 87.3917 43.8826 87.3917 39.4643V12.0378C87.3917 4.82944 96.1766 1.29794 101.166 6.50068L138.086 45.0014C139.595 46.5748 141.68 47.4643 143.86 47.4643H373.492C377.91 47.4643 381.492 51.046 381.492 55.4643V511.832C381.492 516.25 377.91 519.832 373.492 519.832H12.5083C8.09003 519.832 4.5083 516.25 4.5083 511.832V55.4643Z" fill="white" fillOpacity="0.95" />
    </g>
    <defs>
      <filter id="filter0_bdd" x="-45.4917" y="-45.9783" width="476.984" height="615.811" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="25" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="effect1_backgroundBlur" result="effect2_dropShadow" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default Drop;
