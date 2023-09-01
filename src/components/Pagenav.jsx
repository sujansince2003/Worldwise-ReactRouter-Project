import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from "./Logo"

const Pagenav = () => {
    return ( 
        <>
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Login</NavLink>
                </li>
            </ul>
        </nav>
        
        </>
     );
}
 
export default Pagenav;