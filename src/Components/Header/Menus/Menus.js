import React, { useState } from 'react';
import Search from './Search/Search'

import { Link } from 'react-router-dom'

const Menus = (props) => {
  const [hideClass, setClass] = useState('');

  const closeDropdown = () => {
    setClass('hide');
  }
  const showDropdown = () => {
    setClass('');
  }
  
  return(
    <ul className="menus-wrapper">
      <li className="menu-item">
        <Link to="/" className="menu-item-link">Home</Link>
      </li>
      <li className="menu-item">
        <Link to="/movie/all" className="menu-item-link">Movies</Link>
      </li>
      <li className="menu-item">
        <Link to="/tv/all" className="menu-item-link">TV-Series</Link>
      </li>
      <li className="menu-item">
        <Search searchMovie={props.searchMovie} showDropdown={showDropdown}/>
        <ul className={`search-items-wrapper ${hideClass}`}>
          {
            props.searchedMovies.slice(0,5).map(movie => {
              return (
                <li className="search-item" key={movie.id}>
                  <Link to={`/details/movie/${movie.id}`} onClick={closeDropdown} className="search-item-link">{movie.original_title}</Link>
                </li>
              )
            })
          }
        </ul>
      </li>
    </ul>
  )
}

export default Menus;