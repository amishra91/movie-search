import React from 'react';
import Card from '../Card/Card';

const Trending = (props) => {
  
  return(
    <section className="movie-section">
      <h2 className="section-heading">Trending</h2>
      <div className="card-container">
        {
          props.data.map(movie => {
            return (
              <Card name={movie.original_title || movie.original_name || movie.title || movie.name} 
                    key={movie.id} 
                    poster={movie.poster_path} 
                    baseImageUrl={props.baseImageUrl}
                    description={movie.overview}
                    releaseDate={movie.release_date ? movie.release_date.substring(0, movie.release_date.indexOf('-')): 'NA'}
                    type={movie.media_type}
                    />
            )
          })
        }
      </div>
    </section>
  )
}

export default Trending;