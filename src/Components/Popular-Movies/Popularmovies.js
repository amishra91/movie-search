import React from 'react';
import Card from '../Card/Card';

const Popularmovies = (props) => {
  
  return(
    <section className="movie-section">
      <h2 className="section-heading">Popular Movies</h2>
      <div className="card-container">
        {
          props.data.map(movie => {
            return (
              <Card name={movie.original_title || movie.original_name || movie.title || movie.name} 
                    key={movie.id} 
                    poster={movie.poster_path} 
                    baseImageUrl={props.baseImageUrl}
                    description={movie.overview}
                    id={movie.id}
                    releaseDate={movie.release_date ? movie.release_date.substring(0, movie.release_date.indexOf('-')): 'NA'}
                    />
            )
          })
        }
      </div>
    </section>
  )
}

export default Popularmovies;