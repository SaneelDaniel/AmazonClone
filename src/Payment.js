import { useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import {db} from './firebase'

function Payment() {
 
    //state management with hooks

    //state for basket and user details
    const [{basket,user}, dispatch] = useStateValue();

    //state for error handling and payment processing buttons
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    //
    const [succeeded, setSucceeded] = useState(false);
    const[processing, setProcessing] = useState("");

    const [clientSecret, setClientSecret] = useState("");
    
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        //generate the special stripe secret key/sessionId which allows 
        //us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in curriencie's sub-units
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('The SECRET IS >>>>', clientSecret)

    //payment submission handler
    const handleSubmit = async (e) =>{
        // all stripe stuff
        e.preventDefault();
        setProcessing(true); // no more button pressing

        const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            .then(({paymentIntent}) => {
                //paymentIntent = payment Confirmation response

                db
                    .collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })

                setSucceeded(true);
                setError(null)
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET'
                });

                history.replace('/orders')
            })
    }    

    //payment details change handler
    const handleChange = e =>{
        // all card change stuff
        setDisabled(e.empty);
        setError(e.error ? e.error.messages: "");
    }    

    return (
        <div className="payment">

            <div className="payment__container">
                <h1>
                    Checkout(
                        <Link to ="/checkout">{basket?.length} items</Link>
                    )
                </h1>


                {/* delivery address */}
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>

                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>Address goes here</p>
                        <p>abc road</p>
                        <p>360005</p>
                    </div>
                </div>
                {/* delivery address ends*/}

                {/* review items */}
                <div className="payment__section">
                    <div className='payment__title'>
                            <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map (item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* review item end */}

                {/* payment method */}
                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                            {/* Stripe Payment Processing Stuff */}
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) =>(
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeperator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled = {processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                {/* Error Handling */}
                                {error && <div> {error} </div>}
                            </form>
                    </div>
                </div>
                {/* payment method section ends*/}

            </div>
            
        </div>
    )
}

export default Payment
