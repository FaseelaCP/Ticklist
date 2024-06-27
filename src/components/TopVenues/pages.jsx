import React, { useContext, useState } from 'react';
import { Grid, Button, CircularProgress, Box, IconButton } from '@mui/material'; // Import IconButton for buttons
import TopCard from '../Topcard/TopCard';
import VenueContext from '../Context/VenueContext';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const TopVenues = () => {
  const { venues, error } = useContext(VenueContext);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8;

  // Loading state
  if (!venues && !error) {
    return <CircularProgress />; // Show loading indicator while venues are being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentvenues = venues.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < venues.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
     
     <Grid container spacing={2} style={{ height: 'fit-content' }}>  {/* Added style */}
        {currentvenues.map((venue) => (
          <Grid item xs={12} sm={6} md={3} key={venue.id} sx={{ display: 'flex' }}>
            <TopCard venue={venue} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={endIndex >= venues.length}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

export default TopVenues;
