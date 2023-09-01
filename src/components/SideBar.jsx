import { Outlet } from "react-router-dom";
import Appnav from "./Appnav";
import Logo from "./Logo";
import styles from "./sidebar.module.css"

const SideBar = () => {
    return (  
        <div  className={styles.sidebar} >

          <Logo />
          <Appnav />
          <Outlet />  

        </div>
    );
}
 
export default SideBar;