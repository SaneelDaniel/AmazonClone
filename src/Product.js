import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';
// Import standard FlipMotion
import FlipMotion from "react-flip-motion";
 
// Import FlipMotion with animated container height
import { FlipMotionHeight } from "react-flip-motion";

import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


function Product({id, title, image, price, rating}) {

    const [state, dispatch] = useStateValue();
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))


    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          },
        });
    };

    return (
        
        <div className="product">

            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="product__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) =>(
                        <p>🌟</p>
                    ))}
                </div>
            </div>
            
            <img
                src={image} alt=""
            />
            <button onClick={addToBasket} >Add to basket</button>
        </div>
    )
}

export default Product
