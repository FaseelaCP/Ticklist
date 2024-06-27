import React, { useContext, useState } from 'react';
import { Grid, Button, CircularProgress, Box, IconButton } from '@mui/material'; // Import IconButton for buttons
import TopCard from '../Topcard/TopCard';
import AttractionContext from '../Context/AttractionContext';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Topattractions = () => {
  const { attractions, error } = useContext(AttractionContext);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8;

  // Loading state
  if (!attractions && !error) {
    return <CircularProgress />; // Show loading indicator while attractions are being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentattractions = attractions.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < attractions.length) {
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
        {currentattractions.map((attraction) => (
          <Grid item xs={12} sm={6} md={3} key={attraction.id} sx={{ display: 'flex' }}>
            <TopCard attraction={attraction} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={endIndex >= attractions.length}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
};

export default Topattractions;
