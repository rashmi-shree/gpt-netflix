import { createSlice } from "@reduxjs/toolkit"
const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        gptSearch:false,
        movieNames:null,
        movieResults:null,
    },
    reducers:{
        toggleGptSearch:(state, action)=>{
            state.gptSearch = !state.gptSearch
        },
        addGptMovieResult:(state, action)=>{
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults
        }
    }
})

export const {toggleGptSearch, addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer;