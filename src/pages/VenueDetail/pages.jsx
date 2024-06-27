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
import { useContext } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import TopVenues from "../../components/TopVenues/pages";

const VenueDetail = () => {
  const { venueId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const theme = useTheme();

  const [venue, setVenue] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchVenueById = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/venues/${venueId}?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue data");
        }
        const venueData = await response.json();
        console.log("venue data", venueData);
        setVenue(venueData);
        if (
          venueData &&
          venueData._embedded &&
          venueData._embedded.venues &&
          venueData._embedded.venues.length > 0
        ) {
          const location = venueData._embedded.venues[0].name;
          setLocation(location);
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchVenueById();
  }, [venueId]);

  if (!venue) {
    return <div>Loading...</div>; // Show loading indicator while venue data is being fetched
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
        <Link underline="none" color="inherit" href="/venues">
          Venues
        </Link>
        <Typography color="text.primary">{venue.name}</Typography>
      </Breadcrumbs>

      {venue.images && venue.images.length >= 1 && (
        <Slider
          dots
          infinite
          autoplay
          autoplaySpeed={3000}
          style={{ marginBottom: "50px" }}
        >
          {venue.images.map((image) => (
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
                  alt={venue.name}
                  height="600px"
                  image={image.url}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      )}

      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h4" component="div">
            {venue.name}
          </Typography>
          {venue.address && (
            <Typography gutterBottom variant="h6" component="div">
              {venue.address.line1}
            </Typography>
          )}
          {venue.city && (
            <Typography gutterBottom variant="h6" component="div">
              {venue.city.name}
            </Typography>
          )}
          {venue.state && (
            <Typography gutterBottom variant="h6" component="div">
              {venue.state.name}
            </Typography>
          )}
          {venue.country && (
            <Typography gutterBottom variant="h6" component="div">
              {venue.country.name}
            </Typography>
          )}

          {venue.pleaseNote && (
            <Typography gutterBottom variant="body2" sx={{ mb: "4" }}>
              {venue.pleaseNote}
            </Typography>
          )}

          <iframe
            width="450"
            height="250"
            frameBorder="0"
            style={{ border: "0" }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh&q=${location}`}
            allowFullScreen
          ></iframe>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: "10px",
              border: "2px solid #007bff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              padding: "20px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Hurry Up!!
            </Typography>
            {venue.priceRanges && venue.priceRanges.length > 0 && (
              <Typography variant="h6" gutterBottom>
                Price starting from: USD {venue.priceRanges[0].min}
              </Typography>
            )}
            <Link to={venue.url}>
              <Button variant="contained" sx={{ padding: "10px" }}>
                BOOK NOW!!
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid>
        <Typography variant="h6" gutterBottom>
          You might also like:
        </Typography>
        <TopVenues />
      </Grid>
    </div>
  );
};

export default VenueDetail;
