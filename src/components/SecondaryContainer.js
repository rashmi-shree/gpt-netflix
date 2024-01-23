import React from 'react'
import MovieList from "../components/MovieList";
import {useSelector} from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store)=> store.movies);
  return (
    movies.nowPlayingMovies && (
      <div 
        className='bg-black'
      >
      <div 
        className='-mt-52 relative z-1 pl-2' 
      >
        <MovieList 
          title="Now Playing"
          movies = {movies.nowPlayingMovies}
        />
        <MovieList 
          title="Trending"
          movies = {movies.trendingMovies}
        />
        <MovieList 
          title="Top Rated"
          movies = {movies.topRatedMovies}
        />
        <MovieList 
          title="Upcoming"
          movies = {movies.upcomingMovies}
        />
      </div>
    </div>
    )
   
  )
}

export default SecondaryContainer