import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './Login.css'
import {auth} from "./firebase"; 

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    //sign in function for firebase authentication
    const signIn = e =>{
        e.preventDefault();
        // some firebase signin shit
        auth
            .signInWithEmailAndPassword(email, password)
            .then( 
                auth => {
                    history.push('/')                
                }
            )
            .catch(error => alert(error.message))
    }

    //Register function with firebase authentication
    const register = e =>{
        e.preventDefault();

        // some firebase register shit
        history.push('/register')
        /*
        auth
            .createUserWithEmailAndPassword(email.trim(), password)
            .then((auth) =>{
                console.log(auth);

                if(auth){
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
        */
    }

    //Component / View for Login
    return (
        <div className='login'>
            <Link to ='/'>
                <img 
                    className="login__logo" 
                    src='https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE1XFxcLzA4XFxcLzA2MTUzOTM0XFxcL2FtYXpvbi5qcGdcIixcIndpZHRoXCI6NzAwLFwiaGVpZ2h0XCI6MzcwLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuaGVyLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvaGVyXFxcL25vLWltYWdlLnBuZz9pZD0wZDJkNjI3YzA1OWI5ZWRjYWIwZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiIwZGZjNWM4M2QwYTdkMmQ3OTc3MjY1NjQzMjFkNjRjYzk5OGYyYzMxIn0=/amazon.jpg'
                    alt=""
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick= {signIn} className='login__signInButton'>Sign In</button>
                </form>
                <p> By signing-in you agree to our Conditions of Use & Sale. </p>

                <button onClick={register} className='login__registerButton'>Create a New Account</button>
            </div>
        </div>
    )
}

export default Login
