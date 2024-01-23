import React from 'react';
import { useSelector} from "react-redux";
import useMovieTrailer from '../hooks/useMovieTrailer';
const VideoBackground = (props) => {
  const trailerVideo = useSelector((store)=> store.movies?.trailerVideo)
  const {movie_id} = props
  useMovieTrailer(movie_id);
  return (
    <div>
      <iframe 
        className='w-screen aspect-video'
        src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} 
        title="YouTube video player" 
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      >
        </iframe>
    </div>
  )
}

export default VideoBackground
