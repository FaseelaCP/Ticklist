import React, { useContext, useState } from 'react'
import AttractionContext from '../../components/Context/AttractionContext';
import { Card, CardContent, Typography, CardMedia, Breadcrumbs } from '@mui/material';

import { Grid, Button, CircularProgress, Box } from '@mui/material'; // Import Box for spacing
import TopCard from '../../components/Topcard/TopCard';
import { Link } from 'react-router-dom';
export default function AttractionsPage() {
  const {attractions,setattractions}=useContext(AttractionContext);

  return (
    <div className='container'>
    
        <Breadcrumbs aria-label="breadcrumb" sx={{marginTop:3, marginBottom:3}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Attractions</Typography>
        
       
      </Breadcrumbs>
      <Grid container spacing={2}>
      {attractions.map((attraction) => (
        <Grid item xs={12} sm={6} md={3} key={attraction.id}>
          <TopCard attraction={attraction} />
        </Grid>
      ))}
      </Grid>
      
      
    </div>
  )
}
