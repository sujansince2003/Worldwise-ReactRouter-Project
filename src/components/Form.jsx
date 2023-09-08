/* eslint-disable react/prop-types */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import Backbtn from "./Backbtn";
import { useUrlpos } from "../Hooks/useUrlpos";
import Message from "./Message";
import Spinner from "./spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlpos();
  const { CreateCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadinggeocoding, setIsloadinggeocoding] = useState(false);
  const [geocodingError, setgeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  // console.log(maplat, maplng);

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchCityData() {
        try {
          setIsloadinggeocoding(true);
          setgeocodingError("");
          const res = await fetch(
            `${BaseUrl}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);

          if (!data.countryCode)
            throw new Error("Invalid location selected!! Please select City");
          setCityName(data.city || data.locality || " ");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setgeocodingError(err.message);
        } finally {
          setIsloadinggeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await CreateCity(newCity);
    navigate("/app/cities"); //made func async bcz CreateCity is async functio
  }

  if (isLoadinggeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="click on the map " />;

  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd / MM / yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Backbtn />
      </div>
    </form>
  );
}

export default Form;
