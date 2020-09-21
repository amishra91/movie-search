import React from 'react';

const Search = (props) => {
  
  return (
    <input type="text" onClick={props.showDropdown} onChange={props.searchMovie} className="search-input" placeholder="Enter your keyword" />
  )
}

export default Search;