import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../Contexts/CitiesContext";
import Spinner from "./spinner";
import Backbtn from "./Backbtn";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  //const x=useParams()
  /* console.log(x);  return {
  "id": "73930385"
}
return object so we destruct it
*/
  const { id } = useParams();
  const { currentCity, GetCity, isLoading } = useCities();

  useEffect(
    function () {
      GetCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading) return <Spinner />;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.city}>
            <div className={styles.row}>
              <h6>City name</h6>
              <h3>
                <span>{emoji}</span> {cityName}
              </h3>
            </div>

            <div className={styles.row}>
              <h6>You went to {cityName} on</h6>
              <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
              <div className={styles.row}>
                <h6>Your notes</h6>
                <p>{notes}</p>
              </div>
            )}

            <div className={styles.row}>
              <h6>Learn more</h6>
              <a
                href={`https://en.wikipedia.org/wiki/${cityName}`}
                target="_blank"
                rel="noreferrer"
              >
                Check out {cityName} on Wikipedia &rarr;
              </a>
            </div>

            <div>
              <Backbtn />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default City;
