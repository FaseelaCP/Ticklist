import React from 'react';
import { Card, Box, Typography } from '@mui/material';

const RecommendedTag = () => (
  <Box sx={{ position: 'absolute', top: 0, right:0 }}>
    <Typography variant="caption" sx={{ color: 'gray', backgroundColor: 'yellow', padding: '2px 8px', border:'none',
      borderRadius:'3px'
     }}>
      Recommended
    </Typography>
  </Box>
);

export default RecommendedTag