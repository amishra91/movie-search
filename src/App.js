import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Popularmovies from './Components/Popular-Movies/Popularmovies';
import Trending from './Components/Trending/Trending';
import Populartv from './Components/Popular-tv/Populartv';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import './scss/main.scss';

class App extends Component {
  state = {
    popularMovies: [],
    trending: [],
    popularTvShows: [],
    baseImageUrl: 'http://image.tmdb.org/t/p/original'
  }

  componentWillMount() {
    const apiKey = '4c7935e997fdb3205ead78f29b1248c5';
    axios.get(`/movie/popular?api_key=${apiKey}`).then(data => {
      this.setState({
        popularMovies: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });
    
    axios.get(`/trending/all/day?api_key=${apiKey}`).then(data => {
      this.setState({
        ...this.state,
        trending: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });

    axios.get(`/tv/popular?api_key=${apiKey}`).then(data => {
      this.setState({
        ...this.state,
        popularTvShows: data.data.results
      })
    }).catch(error => {
      alert("Something went wrong. Please try again!")
    });
  }

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact>
                <Trending data={this.state.trending} baseImageUrl={this.state.baseImageUrl} />
                <Popularmovies data={this.state.popularMovies} baseImageUrl={this.state.baseImageUrl}/>
                <Populartv data={this.state.popularTvShows} baseImageUrl={this.state.baseImageUrl}/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App;
