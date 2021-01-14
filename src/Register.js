import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from "./firebase"; 
import './Register.css'
import Popup from 'react-popup';
import {db} from './firebase'
import { useStateValue } from './StateProvider';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [{ user }, dispatch] = useStateValue();
    const history = useHistory();


    const register = e =>{
        e.preventDefault();

        if(!password){window.alert('Please enter a Password');}
            else if(!email){window.alert('Please enter an Password');}
            else if(!firstName){window.alert('Please enter a First Name');}
            else if(!lastName){window.alert('Please enter a Last Name');}
            else if(password !== confirmPassword){window.alert('Passwords Do Not Match');}
        else{ //do the registration here
            auth
            .createUserWithEmailAndPassword(email.trim(), password)
            .then((auth) =>{
                console.log(auth);
                
                if(auth){
                    db
                    .collection('Registered_Users')
                    .doc(email)
                    .set({
                        FirstName_LastName : firstName + lastName,
                        
                    })
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
        }
    }
    
    return (
        <div className='register'>
            
            <Link to ='/'>
                <img 
                    className="register__logo" 
                    src='https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE1XFxcLzA4XFxcLzA2MTUzOTM0XFxcL2FtYXpvbi5qcGdcIixcIndpZHRoXCI6NzAwLFwiaGVpZ2h0XCI6MzcwLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuaGVyLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvaGVyXFxcL25vLWltYWdlLnBuZz9pZD0wZDJkNjI3YzA1OWI5ZWRjYWIwZFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiIwZGZjNWM4M2QwYTdkMmQ3OTc3MjY1NjQzMjFkNjRjYzk5OGYyYzMxIn0=/amazon.jpg'
                    alt=""
                />
            </Link>
            <Popup />
            <div className='register__container'>
                <h1>Create New Amazon Account</h1>
                <form>
                    <h5>First Name</h5>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)}/>

                    <h5>Last Name</h5>
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)}/>

                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <h5>Confirm Password</h5>
                    <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>


                </form>
                <p> By signing-in you agree to our Conditions of Use & Sale. </p>

                <button onClick={register} className='login__registerButton'>Create a New Account</button>
            </div>
        </div>
    )
}

export default Register
