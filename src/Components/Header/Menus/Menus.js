import React from 'react';
import Search from './Search/Search'

import { Link } from 'react-router-dom'

const Menus = (props) => {
  return(
    <ul className="menus-wrapper">
      <li className="menu-item">
        <Link to="/" className="menu-item-link">Home</Link>
      </li>
      <li className="menu-item">
        <Link to="/movies" className="menu-item-link">Movies</Link>
      </li>
      <li className="menu-item">
        <Link to="/tv-series" className="menu-item-link">TV-Series</Link>
      </li>
      <li className="menu-item">
        <Link to="/top-imdb" className="menu-item-link">Top IMDB</Link>
      </li>
      <li className="menu-item">
        <Search />
      </li>
    </ul>
  )
}

export default Menus;