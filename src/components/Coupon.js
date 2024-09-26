import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Coupon = ({ applyCoupon }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApplyCoupon = () => {
    if (code.trim() === '') {
      setError('Please enter a coupon code.');
      return;
    }
    applyCoupon(code, setError);
  };

  return (
    <div>
      <Typography variant="h6">Apply Coupon</Typography>
      <TextField 
        label="Coupon Code" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" color="primary" onClick={handleApplyCoupon} sx={{ marginLeft: 2 }}>
        Apply
      </Button>
    </div>
  );
};

export default Coupon;
