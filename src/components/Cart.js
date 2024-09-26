import React from 'react';
import { Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Cart = ({ cartItems, removeFromCart, total }) => {
  console.log('Cart Items:', cartItems);
  return (
    <Box sx={{ padding: 2, border: '1px solid gray', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Cart</Typography>
      <List>
        {cartItems.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <Button variant="contained" color="secondary" onClick={() => removeFromCart(item._id)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total}</Typography>
    </Box>
  );
};

export default Cart;
