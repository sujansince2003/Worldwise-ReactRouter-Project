import styles from './Button.module.css'
const Button = ({children,onClick,type}) => {
    return ( 
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
     );
}
 
export default Button;