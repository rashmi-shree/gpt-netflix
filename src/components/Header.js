import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {auth} from "../utils/firebase";
import { signOut } from "firebase/auth";
import {useSelector, useDispatch} from "react-redux";
import {onAuthStateChanged } from "firebase/auth";
import {addUser, removeUser} from "../utils/userSlice";
import { NETFLIX_LOGO, USER_LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user)
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
          className='flex'
        >
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