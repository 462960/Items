import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondaryMenu = ({ x }) => (
  <li>
    <NavLink
      to={x.url}
      activeClassName="active"
      style={{ textDecoration: 'none' }}
    >
      <div className="active-link">
        {x.label}
        <div className="wrap-row wrap-row-hov">
          <svg className="svg-down-arrow-black">
            <use xlinkHref="/images/sprite.svg#right-arrow" />
          </svg>
        </div>
      </div>
    </NavLink>
  </li>
);

export default SecondaryMenu;
