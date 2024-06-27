import { TextField, Typography, Grid, Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopCard from "../../components/Topcard/TopCard";
import { Link } from "react-router-dom";

import { useSearchParams } from "react-router-dom";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
const apiKey = process.env.REACT_APP_TICKETMASTER_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  const fetchEventsBySearch = async () => {
    setIsLoading(true);
    setError(null); // Reset error state on each search

    try {
      const searchResponse = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${apiKey}&q=${searchQuery}`
      );
      console.log("search response:", searchResponse);
      if (!searchResponse.ok) {
        throw new Error("Failed to fetch event data");
      }
      const searchData = await searchResponse.json();
      console.log("search data", searchData);
      setEvents(searchData);
    } catch (error) {
      console.error("Error fetching event data:", error);
      setError(error.message); // Set specific error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsBySearch();
  }, [searchQuery]);

  

  return (
    <div className="container" style={{height:'100vh'}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: 3, marginBottom: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Search Results</Typography>
      </Breadcrumbs>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>
          Sorry! An error occurred: {error}
        </Typography>
      ) : !events.length ? (
        <>
          {searchQuery && ( // Only display suggestions if search query exists
            <Typography>No results found for "{searchQuery}".</Typography>
          )}
          {/* Optional: Display search suggestions here if implemented */}
        </>
      ) : (
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <TopCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
