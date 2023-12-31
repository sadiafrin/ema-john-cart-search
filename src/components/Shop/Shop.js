import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart, getStoredCart } from '../../utilities/fakedb';
import useProducts from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

const Shop = () => {
   const [products, setProducts] = useProducts();
    const [cart, setCart] = useState([]);

    

  useEffect (() =>{
    console.log('local storage first line', products)
    const storedCard =getStoredCart();
    const savedCart= [];
    for(const id in storedCard){
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct){
            const quantity = storedCard[id];
            addedProduct.quantity= quantity;
            savedCart.push(addedProduct);
        }

    }
    setCart(savedCart);
    // console.log('local storage finished');

  },[products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart =[];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // cart.push(product);
        setCart(newCart);
       addToDb(selectedProduct.id);
}
    return (
        <div className="shop-container">
           <div className="products-container">
                {
                    products.map(product => <Product 
                    key={product.id}
                    product ={product}
                    handleAddToCart ={handleAddToCart}
                  
                    ></Product>)
                }
           </div>
                    
           <div className="cart-container">
                <Cart cart={cart}> 
                 <Link to = "/orders">
                    <button className='proceed-checkout-btn'>Review Order</button>

                 </Link>
                </Cart>
            </div> 
        </div>
    );
};

export default Shop;