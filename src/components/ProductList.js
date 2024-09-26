import React from 'react';
import { Grid, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductList = ({ products, addToCart }) => {
  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="150"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                {product.description}
              </Typography>
              <Typography>Price: ${product.price}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => addToCart(product)}
                sx={{ marginTop: 1 }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
