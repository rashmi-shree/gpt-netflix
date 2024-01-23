import React from 'react'
import {useSelector} from 'react-redux';
import VideoTitle from "../components/VideoTitle";
import VideoBackground from "../components/VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store)=> store.movies?.nowPlayingMovies)
  if(!movies) return;
  const mainMovies = movies[0]
  const {original_title, overview, id} = mainMovies;
  return (
    <div>
      <VideoTitle 
        title={original_title}
        overview={overview}
      />
      <VideoBackground 
        movie_id={id}
      />
    </div>
    
  )
}

export default MainContainer