import React from 'react';

const Card = (props) => {
  return(
    <div className="card-wrapper">
      <div className="card">
        <div className="card-img-wrapper">
          <img src={`${props.baseImageUrl}${props.poster}`} alt={props.name} className="poster-img" />
        </div>
        <div className="card-content">
          <p className="movie-name">{props.name}</p>
          <p className="movie-desc">{props.description}</p>
          <p className="movie-desc release-date">{props.releaseDate}</p>
          {
            props.type ? <p className="movie-desc type">{props.type}</p> : null
          }
        </div>
      </div>
    </div>
  )
}

export default Card;