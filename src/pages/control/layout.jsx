import { Link, Navigate, Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/providers/authprovider";

const ControlLayout = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (user === null || user == []) return <Navigate to="/login" />;
  return (
    <main className={styles.main__wrapper}>
      <aside className={styles.navigation}>
        <ul>
          <li className={styles.navigation__item + " " + styles.border}>
            <Link className={styles.navigation__link} to={`/control/events`}>
              Мероприятия
            </Link>
          </li>
          <li className={styles.navigation__item + " " + styles.border}>
            <Link className={styles.navigation__link} to={`/control/groups`}>
              Группы
            </Link>
          </li>
          <li className={styles.navigation__item + " " + styles.border}>
            <Link
              className={styles.navigation__link}
              to={`/control/workgroups`}
            >
              Классы
            </Link>
          </li>
          <li className={styles.navigation__item}>
            <Link className={styles.navigation__link} to={`/control/users`}>
              Пользователи
            </Link>
          </li>
        </ul>
      </aside>
      <Outlet />
    </main>
  );
};

export default ControlLayout;
