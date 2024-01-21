import React from 'react'
import {useNavigate} from 'react-router-dom';
import {auth} from "../utils/firebase";
import { signOut } from "firebase/auth";
import {useSelector} from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user)
  const signOutEvent = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  }
  return (
    <div 
     className='w-screen absolute pl-8 pt-2 bg-gradient-to-b from-black flex justify-between'
    >
      <img 
        className='w-40'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
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
          src={user?.photoURL}
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