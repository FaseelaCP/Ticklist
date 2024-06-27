import { TextField, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopCard from "../../components/Topcard/TopCard";
import { useParams } from "react-router-dom";
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function Search() {
  const search = useParams();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  const fetchEventsBySearch = (async () => {
    setIsLoading(true);
    setError(null); // Reset error state on each search

    try {
      const searchResponse = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh&q=${search}`
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
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  }, 500); // Debounce with 500ms delay (adjust as needed)

  useEffect(() => {
    fetchEventsBySearch();
  }, [search]);

  return (
    <div className="container">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : !events.length ? (
        <>
          <Typography>Find Suggestions</Typography>
         
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
