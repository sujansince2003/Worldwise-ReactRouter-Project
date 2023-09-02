import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
const Map = () => {
    const [searchParam,setSearchParam]=useSearchParams();
    const lat=searchParam.get("lat")
    const lng=searchParam.get("lng")
    const navigate= useNavigate()
   

    return ( 
        <div className={styles.mapContainer} onClick={()=>navigate("form")}>
            Map
            {lat}
            {lng}
        </div>
     );
}
 
export default Map;