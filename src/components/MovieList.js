import React from 'react'
import MovieCard from "../components/MovieCard";

const MovieList = (props) => {
  const {title, movies} = props
  return (
    <div className='px-4'>
    <div className='text-4xl p-2 text-white'>
        <h1>{title}</h1>
      </div>
    <div className='flex overflow-x-scroll'>
      
      <div className='flex'>
        {
          movies.map((movie)=> 
            <MovieCard 
              key={movie.id}
              poster_path={movie?.poster_path}
            />
          )
        }
        
      </div>
    </div>
    </div>
  )
}

export default MovieList