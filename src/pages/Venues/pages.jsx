import React, { useContext, useState } from 'react'
import VenueContext from '../../components/Context/VenueContext';
import { Card, CardContent, Typography, CardMedia, Breadcrumbs } from '@mui/material';

import { Grid, Button, CircularProgress, Box } from '@mui/material'; // Import Box for spacing
import TopCard from '../../components/Topcard/TopCard';
import { Link } from 'react-router-dom';
export default function VenuesPage() {
  const {venues}=useContext(VenueContext);
  console.log("venues in page", venues)

  return (
    <div className='container'>
    
        <Breadcrumbs aria-label="breadcrumb" sx={{marginTop:3, marginBottom:3}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Venues</Typography>
        
       
      </Breadcrumbs>
      <Grid container spacing={2}>
      {venues?.map((venue) => (
        <Grid item xs={12} sm={6} md={3} key={venue.id}>
          <TopCard venue={venue} />
        </Grid>
      ))}
      </Grid>
      
      
    </div>
  )
}
