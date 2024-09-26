import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Coupon from './components/Coupon';
import { fetchProducts } from './services/productService';
import { fetchCoupons } from './services/couponService';

const App = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [coupons, setCoupons] = useState([]); // State to hold an array of coupons
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // Discount percentage
  const [error, setError] = useState(''); // State to hold error message

  // Fetch products and coupons from API on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData); // Set products state with fetched data
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    const getCoupons = async () => {
      try {
        const couponData = await fetchCoupons();
        setCoupons(couponData); // Set coupons state directly as an array of objects
      } catch (error) {
        console.error('Failed to load coupons:', error);
      }
    };

    getProducts();
    getCoupons();
  }, []); // Empty dependency array means this runs once on mount

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const applyCoupon = (code) => {
    if (cart.length === 0) {
      setError('Your cart is empty. Add products to apply a coupon.'); // Validation for empty cart
      return;
    }

    // Check if coupons exist and find the coupon matching the code
    const coupon = coupons.find(c => c.code === code);

    if (coupon) {
      const today = new Date();
      const expirationDate = new Date(coupon.expirationDate);

      // Check if the coupon is still valid
      if (today <= expirationDate) {
        setDiscount(coupon.discount); // Apply the coupon discount percentage
        setError(''); // Clear error if the coupon is valid
      } else {
        setDiscount(0);
        setError('Coupon expired.'); // Set error if coupon is expired
      }
    } else {
      setDiscount(0); // No discount if coupon is invalid
      setError('Invalid coupon code.'); // Set error for invalid coupon
    }
  };

  // Calculate total price and apply discount
  const calculateTotal = () => {
    console.log('Calculating total with discount:', discount);
    const totalWithoutDiscount = cart.reduce((sum, item) => sum + item.price, 0);
    const discountedTotal = totalWithoutDiscount - (totalWithoutDiscount * discount / 100);
    console.log('Discounted total:', discountedTotal);
    return discountedTotal.toFixed(2); // Ensure the total is rounded to two decimal places
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        {/* Main Product List Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ marginY: 2 }}>Product List</Typography>
          <ProductList products={products} addToCart={addToCart} />
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Coupon Section with spacing */}
            <Box sx={{ mb: 2 }}>
              <Coupon applyCoupon={applyCoupon} error={error} />
            </Box>
            
            {/* Cart Section */}
            <Cart cartItems={cart} removeFromCart={removeFromCart} total={calculateTotal()} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
