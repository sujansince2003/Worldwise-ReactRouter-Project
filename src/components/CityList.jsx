import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from "./spinner"

const CityList = ({cities,isLoading}) => {
    if(isLoading) return <Spinner />
    return ( 
        <>
        <ul className={styles.cityList}>
        {
            cities.map((city,index)=><CityItem city={city} key={index}/>)
            
        }
        

        

        </ul>
        </>
     );
}
 
export default CityList;