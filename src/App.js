
import './App.css';
import React, { useEffect, useState } from "react";
import Header from './Header';
import Home from './Home';
import Orders from './Orders'
import Checkout from './Checkout'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import { auth , db } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Register from './Register';



const promise = loadStripe(
  'pk_test_51I6A3ZF2utBBtSGKm8rmIfTfr9MnqYbg2gtyhqWRArsp0ma0oXQuhR806NFSFjSf053ru5VKb0uz8Rcp7lkpOtmH00GgyQxJBn'
  );

function App() {

  const [{basket}, dispatch] = useStateValue();
  const [data, setData] = useState();

  useEffect(() =>{
    //will only run once when app component loads...

    auth.onAuthStateChanged( authUser => {
      console.log('The  User Is >>>>', authUser);


      if(authUser){
        //the user just logged in / the user was logged in
       
        //storing user to the context api
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])

  return (
    //BEM 
    <Router>
       <div className="app">
       <Header /> {/* Header Component*/} 
        <Switch>  

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/checkout"> {/* The Checkout Route/Page */}
            <Checkout />
          </Route>

          <Route path="/payment"> {/* The Payment Route/Page */}
            <Elements  stripe={promise}>
              <Payment />
            </Elements> 
          </Route>

          <Route path="/orders">
            <Orders />
          </Route>

          <Route path="/"> {/* The Home Route/Page */}
            <Home /> {/* Home Component*/}
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
