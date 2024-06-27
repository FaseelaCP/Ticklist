import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EventsPage from '../../pages/Events/events'
import AttractionsPage from '../../pages/Attractions/pages'
import VenuesPage from '../../pages/Venues/pages'

export default function Footer() {
  return (
    <div style={{position:'relative', bottom:'0'}}>
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 3 }}>
        <Grid container sx={{display:'flex',  justifyContent:'space-evenly', alignContent:'center', textAlign:'center'}} >
          <Grid item xs={4}>
           <Link to={'/events'} style={{color:'white', textDecoration:'none'}}> <Typography>Events </Typography></Link>
           <Link to={'/attractions'}style={{color:'white', textDecoration:'none'}}> <Typography>Attractions </Typography></Link>
           <Link to={'/venues'} style={{color:'white', textDecoration:'none'}}> <Typography>Venues </Typography></Link>
          </Grid>
          <Grid item xs={4}>
           <Typography>Terms & Conditions</Typography>
           <Typography>Services</Typography>
           <Typography>Contact Us</Typography>
          </Grid>
          <Grid item xs={4}>
           <Typography>About Us</Typography>
           <Typography>FAQ</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
