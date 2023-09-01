import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from "./spinner"
import Message from "./Message"

const CountriesList = ({cities,isLoading}) => {
    
    const {country}=cities;
    if(isLoading) return <Spinner />

    if(!cities.length) return <Message message="Add your city clicking in the map" />
    const countries=cities.reduce((arr,city)=>
    {
        if(!arr.map((el)=>el.country).includes(city.country))
        return [...arr,{country:city.country,emoji:city.emoji}]
    else return arr
    },[])
    
    return ( 
        <>
        <ul className={styles.countryList}>
        {
            countries.map((country,index)=><CountryItem country={country} key={index}/>)
            
        }
        </ul>
        </>
     );
}
 
export default CountriesList;