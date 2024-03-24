import { useState } from "react";
import Button from "../../button/button";
import styles from "./edituser.module.css";
import PropTypes from "prop-types";
import UsersService from "../../../services/users/users";

function EditUserForm({ user, setUser }) {
  const [formuser, setFormUser] = useState({
    username: user.username,
    email: user.email,
    name: user.name === null ? "" : user.name,
    soname: user.soname === null ? "" : user.soname,
  });
  const resetForm = (ev) => {
    ev.preventDefault();
    setFormUser({
      username: user.username,
      email: user.email,
      name: user.name === null ? "" : user.name,
      soname: user.soname === null ? "" : user.soname,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await UsersService.update(
      user.id,
      formuser.username.replaceAll(" ", ""),
      formuser.email.replaceAll(" ", ""),
      formuser.name,
      formuser.soname
    );
    console.log(response);
    setUser({
      ...user,
      username: formuser.username,
      email: formuser.email,
      name: formuser.name,
      soname: formuser.soname,
    });
  };
  return (
    <form className={styles.user__form}>
      <label className={styles.label}>
        Имя пользователя
        <input
          className={styles.text__input}
          type="text"
          value={formuser.username}
          onChange={(e) =>
            setFormUser({ ...formuser, username: e.target.value })
          }
        />
      </label>
      <label className={styles.label}>
        Адрес электронной почты
        <input
          className={styles.text__input}
          type="email"
          value={formuser.email}
          onChange={(e) => setFormUser({ ...formuser, email: e.target.value })}
        />
      </label>
      <label className={styles.label}>
        Фамилия
        <input
          className={styles.text__input}
          type="text"
          value={formuser.soname}
          onChange={(e) => setFormUser({ ...formuser, soname: e.target.value })}
        />
      </label>
      <label className={styles.label}>
        Имя
        <input
          className={styles.text__input}
          type="text"
          value={formuser.name}
          onChange={(e) => setFormUser({ ...formuser, name: e.target.value })}
        />
      </label>
      <div className={styles.change__row}>
        <Button
          buttonStyle="primary"
          buttonText="Изменить"
          clickHande={(e) => submit(e)}
        />
        <Button
          buttonStyle="secondary"
          buttonText="Сброс"
          clickHande={(ev) => resetForm(ev)}
        />
      </div>
    </form>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default EditUserForm;
