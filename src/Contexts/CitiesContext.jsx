/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useReducer } from "react";

const fetchlink = "http://localhost:8000";

const initialstate = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function render(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      console.log("default state");
  }
}

const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(render, initialstate);
  const { cities, isLoading, currentCity } = state;
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchcities() {
      dispatch({ type: "loading" });
      try {
        // setIsloading(true);
        const res = await fetch(`${fetchlink}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchcities();
  }, []);

  async function GetCity(id) {
    dispatch({ type: "loading" });
    try {
      // setIsloading(true);
      const res = await fetch(`${fetchlink}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }
  async function CreateCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsloading(true);
      const res = await fetch(`${fetchlink}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // setCities((cities) => [...cities, data]);
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function deleteCity() {
    dispatch({ type: "loading" });
    try {
      // setIsloading(true);
      await fetch(`${fetchlink}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities(cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        GetCity,
        CreateCity,
        deleteCity,
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

export { CitiesProvider, useCities };
