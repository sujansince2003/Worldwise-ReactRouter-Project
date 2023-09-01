import { Link } from "react-router-dom";
import Pagenav from "../components/Pagenav";

const Homepage = () => {
    return ( <> 
    <Pagenav />
        <div>homepage</div>
        {/* <a href="/pricing">pricing</a>
         */}
         <Link to="./app">Go to app</Link>
        </> );
}
 
export default Homepage;