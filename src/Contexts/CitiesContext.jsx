/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

const fetchlink = "http://localhost:8000";

const citiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function GetCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${fetchlink}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        GetCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

//creating custom hook to consume context

const useCities = () => {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error(" context is used outside the cityProvider function");
  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
