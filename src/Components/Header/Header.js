import React from 'react';
import Menus from './Menus/Menus';

const Header = (props) => {
  return (
    <header className="main-header">
      <Menus searchMovie={props.searchMovie} searchedMovies={props.searchedMovies}/>
    </header>
  )
}

export default Header;