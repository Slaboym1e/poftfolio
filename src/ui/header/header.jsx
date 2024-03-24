import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/providers/authprovider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={`global__wrapper ` + styles.header__wrapper}>
        <Link to="/">
          <img src="/vite.svg" alt="App logo"></img>
        </Link>
        <ul className={styles.nav}>
          <li className={styles.nav__item}>
            <Link to="/control">Панель управления</Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="#">Мое портфолио</Link>
          </li>
        </ul>
        {user === null ? (
          <Link to="/login">Вход</Link>
        ) : (
          <div onClick={() => logout()}>Logout</div>
        )}
      </div>
    </header>
  );
};

export default Header;
