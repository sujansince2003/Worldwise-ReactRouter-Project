import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"

const Pagenav = () => {
    return ( 
        <>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
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