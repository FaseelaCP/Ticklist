import MyCarousel from '../../components/Carousel/Carousel';
import TopEvents from '../../components/TopEvents/TopEvents';
import TopAttractions from '../../components/TopAttractions/TopAttractions';
import TopVenues from '../../components/TopVenues/pages'
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryNav from '../../components/CategoryNavbar/CategoryNav';



const HomePage=()=>{
  return(<div className='container'>
   <CategoryNav/>
    <MyCarousel />
    <Typography variant="h5" mt={3} mb={2}>
        <Link to={'/events'} style={{ textDecoration: 'none', color: 'inherit' }}>
          Top Events <ChevronRightIcon />
        </Link>
      </Typography>
    <TopEvents/>
    
    <Typography variant="h5" mt={3} mb={2}>
        <Link to={'/attractions'} style={{ textDecoration: 'none', color: 'inherit' }}>
          Top Attractions <ChevronRightIcon />
        </Link>
      </Typography>
    <TopAttractions/>

    <Typography variant="h5" mt={3} mb={2}>
        <Link to={'/venues'} style={{ textDecoration: 'none', color: 'inherit' }}>
          Top Venues <ChevronRightIcon />
        </Link>
      </Typography>
    <TopVenues/>
    

   


    </div>)
}
export default HomePage