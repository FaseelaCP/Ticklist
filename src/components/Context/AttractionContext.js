import React, { createContext, useState, useEffect } from "react";

const AttractionContext = createContext({});

const apiKey = process.env.REACT_APP_TICKETMASTER_KEY;

export const AttractionProvider = ({ children }) => {
  const [attractions, setAttractions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractionDataFromApi = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const attractionsData = await response.json();

        setAttractions(attractionsData._embedded.attractions);
      } catch (error) {
        console.error("Fetch error:", error); // Log any fetch errors
        setError(error.message);
      }
    };

    fetchAttractionDataFromApi();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!attractions) {
    return <div>Loading...</div>; // Handle case where attractions data is still being fetched
  }
  const attrValue = { attractions, setAttractions, error, setError };

  return (
    <AttractionContext.Provider value={attrValue}>
      {children}
    </AttractionContext.Provider>
  );
};

export default AttractionContext;
