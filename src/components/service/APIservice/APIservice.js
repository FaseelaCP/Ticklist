import React, { useState, useEffect } from "react";

class APIservice {
  static fetchEventData = async () => {
    const [events, setEvents] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchEventDataFromApi = async () => {
        try {
          const response = await fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const json = await response.json();
          setEvents(json);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchEventDataFromApi();
    }, []);

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!events) {
      return <div>Loading...</div>;
    }

    // Render your component with the fetched data
  };
}

export default APIservice;
