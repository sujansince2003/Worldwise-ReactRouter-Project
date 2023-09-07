/* eslint-disable react/prop-types */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import Backbtn from "./Backbtn";
import { useUrlpos } from "../Hooks/useUrlpos";

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

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadinggeocoding, setIsloadinggeocoding] = useState(false);
  // console.log(maplat, maplng);

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsloadinggeocoding(true);
          const res = await fetch(
            `${BaseUrl}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);
          setCityName(data.city || data.locality || " ");
        } catch (err) {
          alert("err.message");
        } finally {
          setIsloadinggeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
