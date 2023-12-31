import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

const CityList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your city clicking in the map" />;
  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((city, index) => (
          <CityItem city={city} key={index} />
        ))}
      </ul>
    </>
  );
};

export default CityList;
