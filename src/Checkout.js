import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'

function Checkout() {

    const [{basket, user}, dispatch] = useStateValue();
    
    return (
        <div className ="checkout">

            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://www.karooya.com/blog/wp-content/uploads/2018/12/AmazonAdvertising.png"
                    alt=""
                />
                <div>
                    <h3>Hello {user?.email}</h3>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {basket.map (item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}

                    {/* CheckoutProduct */}
                    {/* CheckoutProduct */}
                    {/* CheckoutProduct */}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
            
        </div>
    )
}

export default Checkout
