import React, { createContext, useState, useEffect } from 'react';

const VenueContext = createContext({});

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
 
  useEffect(() => {
    const fetchVenueDataFromApi = async () => {
      try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/venues?apikey=f8NoEtkPderIKMZAOmWbuJd3P6TFhlgh`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const venueData = await response.json();
        setVenues(venueData._embedded.venues);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false whether success or error
      }
    };

    fetchVenueDataFromApi();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const venueValue = { venues, setVenues, error, setError };

  return (
    <VenueContext.Provider value={venueValue}>
      {children}
    </VenueContext.Provider>
  );
};

export default VenueContext;
