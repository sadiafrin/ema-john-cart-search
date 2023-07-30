import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] =useState([]);
    const [cart, setCart] = useState([]);

    useEffect (() => {
        console.log('products load before fetch')
        fetch('products.json')
        .then(res => res.json())
        .then(data =>{
            setProducts(data);
            console.log('products loaded')
        }) 

    },[products]);

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

    const handleAddToCart = (product) =>{
        console.log(product);
        // cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
       addToDb(product.id);
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
                <Cart cart={cart}> </Cart>
            </div> 
        </div>
    );
};

export default Shop;