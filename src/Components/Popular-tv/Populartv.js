import React from 'react';
import Card from '../Card/Card';

const Populartv = (props) => {
  
  return(
    <section className="movie-section">
      <h2 className="section-heading">Popular TV-Series</h2>
      <div className="card-container">
        {
          props.data.map(movie => {
            console.log('movie=', movie)
            return (
              <Card name={movie.original_title || movie.original_name || movie.title || movie.name} 
                    key={movie.id} 
                    poster={movie.poster_path} 
                    baseImageUrl={props.baseImageUrl}
                    description={movie.overview}
                    releaseDate={movie.first_air_date ? movie.first_air_date.substring(0, movie.first_air_date.indexOf('-')): 'NA'}
                    />
            )
          })
        }
      </div>
    </section>
  )
}

export default Populartv;