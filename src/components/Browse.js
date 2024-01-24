import React, { useEffect } from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import useTrendingMovies from '../hooks/useTrendingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from "../components/GptSearch";
import { useSelector } from 'react-redux';

const Browse = () => {
  const gpt = useSelector((store)=> store.gpt.gptSearch)
  useNowPlayingMovies()
  useTrendingMovies()
  useTopRatedMovies()
  useUpcomingMovies()

  return (
    <div>
      <Header />
      {
        gpt ? <GptSearch />
        : 
        <>
      <MainContainer />
      <SecondaryContainer />
      </>
      }
      
      
      
    </div>
  )
}

export default Browse