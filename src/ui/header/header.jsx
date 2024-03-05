import { Link } from "react-router-dom";
import styles from "./header.module.css"

const Header = () =>{
    return(
        <header className={styles.header}>
            <div className={`global__wrapper `+ styles.header__wrapper}>
            <Link to="/">
            <img src="/vite.svg" alt="App logo"></img>
            </Link>
            <ul className={styles.nav}>
                <li className={styles.nav__item}><Link to="/control">Панель управления</Link></li>
                <li className={styles.nav__item}><Link to="#">Мое портфолио</Link></li>
            </ul>
            <div>
                Вход
            </div>
            </div>
        </header>
    )
}

export default Header;