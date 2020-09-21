import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Popularmovies from './Components/Popular-Movies/Popularmovies';
import Trending from './Components/Trending/Trending';
import Populartv from './Components/Popular-tv/Populartv';
import Details from './Components/Details/Details';
import All from './Components/All/All';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import './scss/main.scss';

class App extends Component {
  state = {
    popularMovies: [],
    trending: [],
    popularTvShows: [],
    apiKey: '4c7935e997fdb3205ead78f29b1248c5',
    baseImageUrl: 'http://image.tmdb.org/t/p/original',
    searchedMovies: []
  }

  componentWillMount() {
    axios.get(`/movie/popular?api_key=${this.state.apiKey}`).then(data => {
      this.setState({
        popularMovies: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });
    
    axios.get(`/trending/all/day?api_key=${this.state.apiKey}`).then(data => {
      this.setState({
        ...this.state,
        trending: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });

    axios.get(`/tv/popular?api_key=${this.state.apiKey}`).then(data => {
      this.setState({
        ...this.state,
        popularTvShows: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });
  }

  searchMovie = (event) => {
    if(event.target.value.length >= 3) {
      axios.get(`/search/movie?api_key=${this.state.apiKey}&query=${event.target.value}`).then(data => {
        this.setState({
          ...this.state,
          searchedMovies: data.data.results
        });
      }).catch(error => {
        alert("Something went wrong. Please try again!")
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <BrowserRouter>
            <Header searchMovie={this.searchMovie.bind(this)} searchedMovies={this.state.searchedMovies}/>
            <Switch>
              <Route path="/" exact>
                <Trending data={this.state.trending} baseImageUrl={this.state.baseImageUrl} />
                <Popularmovies data={this.state.popularMovies} baseImageUrl={this.state.baseImageUrl}/>
                <Populartv data={this.state.popularTvShows} baseImageUrl={this.state.baseImageUrl}/>
              </Route>

              <Route path="/details/:type/:id" exact render={(props) => (<Details apiKey={this.state.apiKey} baseImageUrl={this.state.baseImageUrl} {...props}/>)} />
              <Route path="/:type/all" exact render={(props) => (<All apiKey={this.state.apiKey} baseImageUrl={this.state.baseImageUrl} {...props}/>)} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App;
