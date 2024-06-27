import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardMedia,
  Typography,
  Breadcrumbs,
  Button,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useContext } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import TopAttractions from '../../components/TopAttractions/TopAttractions'

const AttractionDetail = () => {
  const { attractionId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const theme = useTheme();

  const [attraction, setAttraction] = useState(null);
 
  useEffect(() => {
    const fetchAttractionById = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions/${attractionId}?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attraction data");
        }
        const attractionData = await response.json();
       console.log("attraction data", attractionData)
        setAttraction(attractionData);
        
          
      } catch (error) {
        console.error("Error fetching attraction data:", error);
      }
    };

    fetchAttractionById();
  }, [attractionId]);

  if (!attraction) {
    return <div>Loading...</div>; // Show loading indicator while attraction data is being fetched
  }

  const handleOpenLoginModal = () => {};
  const handleBookNow = () => {
    if (isLoggedIn) {
      // Proceed with booking logic for logged-in users
    } else {
      handleOpenLoginModal();
    }
  };

  return (
    <div className="container">
      {/* Breadcrumbs for navigation */}
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontSize: 14,
          textDecoration: "none",
          color: theme.palette.primary.main,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Link underline="none" color="inherit" href="/">
          Home
        </Link>
        <Link underline="none" color="inherit" href="/attractions">
          Attractions
        </Link>
        <Typography color="text.primary">{attraction.name}</Typography>
      </Breadcrumbs>

      {/* Slider for attraction images */}
      {attraction.images && attraction.images.length > 1 && (
        <Slider
          dots
          infinite
          autoplay
          autoplaySpeed={3000}
          style={{ marginBottom: "50px" }}
        >
          {attraction.images.map((image) => (
            <Box
              key={image.url}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <Card
                sx={{
                  maxWidth: 900,
                  margin: "20px auto",
                  borderRadius: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  alt={attraction.name}
                  height="600px" // Set a fixed height for all images, adjust this value as needed
                  image={image.url}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      )}

      {/* Grid for attraction details and map */}
      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={6}>
          {/* attraction details */}
          <Typography gutterBottom variant="h4" component="div">
            {attraction.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Genre: {attraction?.classifications[0].genre.name}
          </Typography>
        
          <Typography gutterBottom variant="h6" component="div">
            Segment: {attraction?.classifications[0].segment.name}
          </Typography>

         
         
        </Grid>
        <Grid item xs={6}>
  <Box
    sx={{
      borderRadius: "10px",
      border: "2px solid #007bff",
      display: "flex",
      flexDirection: "column", // Change to column for vertical layout
      alignItems: "center",
      justifyContent: "center",
      height: "200px",
      padding: "20px", // Add padding to avoid content touching edges
    }}
  >
    <Typography variant="h4" gutterBottom>Hurry Up!!</Typography>
   
    <Link to={attraction.url}>
      <Button variant="contained" sx={{ padding: "10px" }}>
        BOOK NOW!!
      </Button>
    </Link>
  </Box>
</Grid>
      </Grid>
      <Grid>
      <Typography variant="h6" gutterBottom mt={5}>
        You might also like:
      </Typography>
      <TopAttractions/>
      </Grid>
    </div>
  );
};


export default AttractionDetail;
