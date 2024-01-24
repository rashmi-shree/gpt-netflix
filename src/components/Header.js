import React,{useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import {auth} from "../utils/firebase";
import { signOut } from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";
import {onAuthStateChanged } from "firebase/auth";
import {addUser, removeUser} from "../utils/userSlice";
import { NETFLIX_LOGO, USER_LOGO } from '../utils/constants';
import {toggleGptSearch} from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from '../utils/constants';
// import lang from '../utils/languageConstants';
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const langSelect = useRef(null);
  const user = useSelector((store)=> store.user)
  const gptSearch = useSelector((store)=> store.gpt.gptSearch)
  const languageHandleChange = () => {
    // console.log(langSelect.current.value); 
    dispatch(changeLanguage(langSelect.current.value))
  }
  const handleGptSearch = () =>{
    dispatch(toggleGptSearch())
  }
  const signOutEvent = () => {
    signOut(auth).then(() => {
      // navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  }
  useEffect(()=>{
    // onAuthStateChanged function will return unsubscribe function. To make sure that onAuthStateChanged
    // function doesn't gets called everytime on every render we have to return unsubscribe function during 
    // unmounting
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}))
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      }); 
      return () => unsubscribe();
},[])
  return (
    <div 
     className='absolute w-screen px-8 py-2 bg-gradient-to-br from-black z-10 flex justify-between flex-col md:flex-row'
    >
      <img 
        className='w-40'
        src={NETFLIX_LOGO}
        alt='logo'
      />
      {
        user && (
        <div 
          className='flex p-2'
        >
          { gptSearch && (<select
            className='p-2 h-12 mt-4 rounded-lg bg-gray-900 text-white'
            onChange={languageHandleChange}
            ref = {langSelect}
          >
            {
              SUPPORTED_LANGUAGES.map((lang)=>
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
              )
            }
          </select>)}
          <button
            className='bg-purple-800 m-4 p-2 rounded-lg text-white hover:bg-opacity-75'
            onClick={handleGptSearch}
          >{ gptSearch ? "Home" : "GPT Search"}</button>
        <p 
          className='text-white font-bold mt-7'
        >{user?.displayName}</p>
        <img 
          className='w-8 h-10 m-5'
          src={USER_LOGO}
          alt="userlogo"
        />
        <button
          className='text-white font-bold mr-2'
          onClick={signOutEvent}
        >Sign out</button>
        </div>
        )
      }
      
    </div>
  )
}

export default Header