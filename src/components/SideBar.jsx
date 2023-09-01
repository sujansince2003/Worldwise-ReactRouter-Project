import Appnav from "./Appnav";
import Logo from "./Logo";
import styles from "./sidebar.module.css"

const SideBar = () => {
    return (  
        <div  className={styles.sidebar} >

<Logo />
<Appnav />
<p>List of Cities</p>

        </div>
    );
}
 
export default SideBar;