import lang from "../utils/languageConstants";
import { useSelector , useDispatch} from "react-redux";
import {useRef} from 'react';
import openai from "../utils/openai";
import {addGptMovieResult} from "../utils/gptSlice";
import {API_OPTIONS} from "../utils/constants";


const GptSearchBar = () => {
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const langKey = useSelector((store)=> store.config.language)
    const tmdbMovieApi = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
        const json = await data.json();
        return json.results;
      }
    const hangleGptSearchClick = async () => {
    //       const gptQuery = "Act as a movie recommedation system and suggest some movies for the query "+ 
    // `"${searchText.current.value}" only give me names of 5 movies, comma seperated like the example given ahead.
    // example: movie1, movie2, movie3 and so on uptill 5`;
    //     const gptresults = await openai.chat.completions.create({
    //         messages: [{ role: 'user', content: gptQuery }],
    //         model: 'gpt-3.5-turbo',
    //       });
    //       console.log(gptresults.choices);

    const gptMovies = ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    const promiseArray = gptMovies.map((movie)=> tmdbMovieApi(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
    }
    return(
        <div 
            className="pt-[10%] flex justify-center"
        >
            <form 
                className="w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e)=> e.preventDefault()}
            >
                <input
                    ref ={searchText}
                    className="p-4 m-4 col-span-9"
                    type="text"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
                    onClick={hangleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}
export default GptSearchBar;