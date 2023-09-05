/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

const fetchlink = "http://localhost:8000";

const citiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(function () {
    async function fetchcities() {
      try {
        setIsloading(true);
        const res = await fetch(`${fetchlink}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsloading(false);
      }
    }
    fetchcities();
  }, []);

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

//creating custom hook to consume context

export const useCities = () => {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error(" context is used outside the cityProvider function");
  return context;
};

export { CitiesProvider };
