import React from 'react'
import { POSTER_IMG_URL } from '../utils/constants';
const MovieCard = (props) => {
  const {poster_path} = props;
  return (
    <div className='w-40 p-2'>
      <img 
        src={POSTER_IMG_URL+poster_path}
        alt='poster img'
      />
    </div>
  )
}

export default MovieCard