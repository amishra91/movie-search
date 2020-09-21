import React, { Component } from 'react';
import Card from '../Card/Card';
import StarRatings from 'react-star-ratings';
import ShowMoreText from 'react-show-more-text';
import axios from 'axios';

class Details extends Component {
  state = {
    movieData: {},
    actors: '',
    similarMovies: [],
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }

  fetchData = () => {
    axios.get(`${this.props.match.params.type}/${this.props.match.params.id}?api_key=${this.props.apiKey}`).then(data => {
      this.setState({
        movieData: data.data
      });
    }).catch(error => {
      alert('Something went wrong. Please try again');
    });

    axios.get(`${this.props.match.params.type}/${this.props.match.params.id}/credits?api_key=${this.props.apiKey}`).then(data => {
      const actors = data.data.cast.map(actor => {
        return actor.name
      }).join(', ');
      this.setState({
        actors: actors
      });
    }).catch(error => {
      alert('Something went wrong. Please try again');
    });

    axios.get(`${this.props.match.params.type}/${this.props.match.params.id}/recommendations?api_key=${this.props.apiKey}`).then(data => {
      this.setState({
        similarMovies: data.data.results
      });
    }).catch(error => {
      alert('Something went wrong. Please try again');
    });
  }
  
  render() {
    let genres = null;
    if(this.state.movieData.genres) {
     genres = this.state.movieData.genres.map(genre => {
        return genre.name
      }).join(', ');
    }

    return(
      <section className="movie-details-section">
        <div className="movie-details-wrapper">
          <div className="movie-detail-poster-wrapper">
            <img src={`${this.props.baseImageUrl}/${this.state.movieData.poster_path}`} alt={this.state.movieData.name} className="poster-img" />
          </div>

          <div className="movie-details">
            <h1 className="details-movie-name">{this.state.movieData.original_title || this.state.movieData.original_name}
              <span className="start-ratings">
                <StarRatings rating={4.8} 
                  starRatedColor="#8c7000"
                  starEmptyColor="#343a40"
                  numberOfStars={5} 
                  starDimension="20px"/>
              </span>
            </h1>

            <p className="detail-movie-desc">{this.state.movieData.overview}</p>

            <div className="movie-creation-detail-wrapper">
              <div className="movie-creation-detail-table">
                <div className="movie-creation-detail-tag">
                  Genre:
                </div>
                <div className="movie-creation-detail-tag-detail">
                  {genres}
                </div>
              </div>

              <div className="movie-creation-detail-table">
                <div className="movie-creation-detail-tag">
                  Release:
                </div>
                <div className="movie-creation-detail-tag-detail">
                  {this.state.movieData.release_date}
                </div>
              </div>

              <div className="movie-creation-detail-table">
                <div className="movie-creation-detail-tag">
                  Cast:
                </div>
                <div className="movie-creation-detail-tag-detail">
                  <ShowMoreText lines={1}
                    more='+ more'
                    less='- less'
                    anchorClass="show-more-btn"
                    >
                    {this.state.actors}
                  </ShowMoreText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related-movies-wrapper">
          <h4 className="section-heading">You may also like</h4>
          <div className="card-container">
            {
              this.state.similarMovies.map(movie => {
                return (
                  <Card name={movie.original_title || movie.original_name || movie.title || movie.name} 
                        key={movie.id} 
                        poster={movie.poster_path} 
                        baseImageUrl={this.props.baseImageUrl}
                        description={movie.overview}
                        id={movie.id}
                        type={this.props.match.params.type}
                        releaseDate={movie.first_air_date ? movie.first_air_date.substring(0, movie.first_air_date.indexOf('-')): 'NA'}
                        />
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }
}
export default Details;