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
import './eventDeatil.css'
import TopEvents from "../../components/TopEvents/TopEvents";

const EventDetail = () => {
  const { eventId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const theme = useTheme();

  const [event, setEvent] = useState(null);
 const [location,setLocation]=useState('')
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const eventData = await response.json();
        console.log("event data", eventData);
        setEvent(eventData);
        // Assuming the venue location is available directly in eventData
        if (
          eventData &&
          eventData._embedded &&
          eventData._embedded.venues &&
          eventData._embedded.venues.length > 0
        ) {
          const venue = eventData._embedded.venues[0].name;
          setLocation(venue)
         
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventById();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>; // Show loading indicator while event data is being fetched
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
        <Link underline="none" color="inherit" href="/events">
          Events
        </Link>
        <Typography color="text.primary">{event.name}</Typography>
      </Breadcrumbs>

      {/* Slider for event images */}
      {event.images && event.images.length > 1 && (
        <Slider
          dots
          infinite
          autoplay
          autoplaySpeed={3000}
          style={{ marginBottom: "50px" }}
        >
          {event.images.map((image) => (
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
                  alt={event.name}
                  height="600px" // Set a fixed height for all images, adjust this value as needed
                  image={image.url}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      )}

      {/* Grid for event details and map */}
      <Grid container spacing={2} marginTop={5}>
        <Grid item xs={6}>
          {/* Event details */}
          <Typography gutterBottom variant="h4" component="div">
            {event.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Genre: {event?.classifications[0].genre.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ fontWeight: "200", marginBottom: "20px" }}
          >
            Date & Time: {event.dates.start.localDate}{" "}
            {event.dates.start.localTime}
          </Typography>
          {event && event.ticketLimit && event.ticketLimit.info}(
            <Typography gutterBottom variant="body2" sx={{ fontWeight: "600" }}>
            Ticket Information: {event.ticketLimit.info}
          </Typography> )
          {event && event.pleaseNote }(
          <Typography gutterBottom variant="body2" sx={{mb:'4'}}>
            {event.pleaseNote}
          </Typography>)
         
          

       
          {/* Map container */}
          
          <iframe
  width="450"
  height="250"
  frameborder="0" style={{border:"0"}}
  referrerpolicy="no-referrer-when-downgrade"
  src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyDjoibXHGR5OzWEXV87-5EI2pzj74Mb2So&q="+location}
  allowfullscreen>
</iframe>

          {/* Price and booking button */}
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
    <Typography variant="h6" gutterBottom>
            Price starting from: USD {event.priceRanges[0].min}
          </Typography>
    <Link to={event.url}>
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
      <TopEvents/>
      </Grid>
    </div>
  );
};

export default EventDetail;
