import React, { useContext, useState } from 'react'
import EventContext from '../../components/Context/EventContext'
import { Card, CardContent, Typography, CardMedia, Breadcrumbs } from '@mui/material';

import { Grid, Button, CircularProgress, Box } from '@mui/material'; // Import Box for spacing
import TopCard from '../../components/Topcard/TopCard';
import { Link } from 'react-router-dom';
export default function EventsPage() {
  const {events,setEvents}=useContext(EventContext);

  return (
    <div className='container'>
    
        <Breadcrumbs aria-label="breadcrumb" sx={{marginTop:3, marginBottom:3}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Events</Typography>
        
       
      </Breadcrumbs>
      <Grid container spacing={2}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={3} key={event.id}>
          <TopCard event={event} />
        </Grid>
      ))}
      </Grid>
      
      
    </div>
  )
}
