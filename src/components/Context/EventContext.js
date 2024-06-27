import React, { createContext, useState, useEffect } from 'react';

const EventContext = createContext({});

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  
  useEffect(() => {
    const fetchEventDataFromApi = async () => {
      try {
        const response = await fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const eventData = await response.json();
        
        setEvents(eventData._embedded.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false whether success or error
      }
    };

    fetchEventDataFromApi();
  }, []);
 
    

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const eventValue={ events, setEvents, error, setError }

  return (
    <EventContext.Provider value={eventValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
