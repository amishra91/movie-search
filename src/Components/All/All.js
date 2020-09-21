import React, { Component } from 'react';
import Card from '../Card/Card';
import axios from 'axios';

class All extends Component {
  state = {
    allMovies: [],
    pageNumber: 1,
    displayPrevBtn: false
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.pageNumber !== this.state.pageNumber) {
      this.fetchData();
    }

    if(this.props.match.params.type !== prevProps.match.params.type) {
      this.fetchData();
    }
  }

  fetchData = () => {
    axios.get(`/discover/${this.props.match.params.type}?api_key=${this.props.apiKey}&page=${this.state.pageNumber}`).then(data => {
      this.setState({
        allMovies: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });
  }

  incrementPageNum = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
      displayPrevBtn: true
    });
  }
  decrementPageNum = () => {
    if(this.state.pageNumber > 1) {
      this.setState({
        pageNumber: this.state.pageNumber -1
      });
    }
  }


  
  render() {
    const sectionHeading = this.props.match.params.type === 'movie' ? "Movies" : "TV-Series"
    return(
      <section className="movie-section">
        <h2 className="section-heading">{sectionHeading}</h2>
        <div className="card-container">
          {
            this.state.allMovies.map(movie => {
              return (
                <Card name={movie.original_title || movie.original_name || movie.title || movie.name} 
                      key={movie.id} 
                      poster={movie.poster_path} 
                      baseImageUrl={this.props.baseImageUrl}
                      description={movie.overview}
                      type={this.props.match.params.type}
                      id={movie.id}
                      />
              )
            })
          }
        </div>

        <div className="next-prev-btn-wrapper">
          {
            this.state.displayPrevBtn ? <button className="next-prev-btn" onClick={this.decrementPageNum}>Previous</button> : 
            <button className="next-prev-btn disabled">Previous Page</button>
          }
          
          <button className="next-prev-btn" onClick={this.incrementPageNum}>Next Page</button>
        </div>
      </section>
    )
  }
}
export default All;