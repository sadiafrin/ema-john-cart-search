import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const {cart} = props;


    let total = 0;
    let shipping= 0;
    for(const product of cart){
        total= total + product.price;
        shipping =shipping + product.shipping;
    }
     const tax = parseFloat((total * 0.1).toFixed(2));
     const grandTotal= total + shipping +tax;

    return (
        <div className='cart'>
              <h4>Order summary</h4>
             <p>Select items: {cart.length}</p>
             <p>Total price: $ {total}</p>
              <p>Total shipping: ${shipping}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;