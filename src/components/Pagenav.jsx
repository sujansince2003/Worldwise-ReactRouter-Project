import { NavLink } from "react-router-dom";

const Pagenav = () => {
    return ( 
        <>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Homepage</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">pricing</NavLink>
                </li>
            </ul>
        </nav>
        
        </>
     );
}
 
export default Pagenav;