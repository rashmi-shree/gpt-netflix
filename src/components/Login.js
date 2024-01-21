import React,{useState, useRef} from 'react';
import Header from './Header';
import {checkSignInValidateData, checkSignUpValidateData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const isSignInFormEvent = () => {
        setIsSignInForm(!isSignInForm)
    }
    const handleButtonClick = () => {
        
        let message;
        if (isSignInForm){
            message = checkSignUpValidateData(name.current.value, email.current.value, password.current.value)
        }
        else {
            message = checkSignInValidateData( email.current.value, password.current.value)
        }
        setErrorMessage(message)
        
        if(message) return;

        //sign up and sign in logic
        if(isSignInForm){
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }else{
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });

        }
    }
    return (
        <div>
            <Header />
            <img 
                src='https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_small.jpg'
                alt='background-img'
            />
            <form 
                onSubmit={(e)=>e.preventDefault()}
                className="w-3/12 absolute top-0 bg-black right-0 left-0 my-36 mx-auto text-white p-12 bg-opacity-80"
            >
                <h1
                    className="font-bold m-2 text-3xl py-4"
                >{isSignInForm ? "Sign Up" : "Sign In" } </h1>
                {
                    isSignInForm && 
                    
                    <input 
                        ref = {name}
                        className="p-4 my-2 w-full rounded-lg bg-gray-800"
                        type="text" 
                        placeholder="Full Name" 
                    />
                }
                
                <input 
                    ref ={email}
                    className="p-4 my-2 w-full rounded-lg bg-gray-800"
                    type="text" 
                    placeholder="Email address" 
                />
                <input 
                    ref = {password}
                    className="p-4 my-2 w-full rounded-lg bg-gray-800"
                    type="password"
                    placeholder="Password"
                />
                <button
                    onClick={handleButtonClick}
                    className="my-4 p-4 w-full bg-red-800 rounded-lg hover:bg-opacity-90"
                >
                    {
                        isSignInForm ? "Sign Up" : "Sign In"
                    }
                </button>
                <p 
                    className="text-red-800 font-bold"
                >{errorMessage}</p>
                <p
                    className="py-4 cursor-pointer"
                    onClick={isSignInFormEvent}
                >
                    {
                    isSignInForm ? "Already a user? Sign In" : "New to netlix? Sign Up"
                   }
                     </p>
            </form>
        </div>
    );
}
export default Login;