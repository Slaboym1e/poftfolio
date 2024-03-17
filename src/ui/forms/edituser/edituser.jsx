import { useState } from "react";
import Button from "../../button/button";
import styles from "./edituser.module.css";
import PropTypes from "prop-types";
import UsersService from "../../../services/users/users";

function EditUserForm({ user, setUser }) {
  const [formuser, setFormUser] = useState(user);
  const resetForm = (ev) => {
    ev.preventDefault();
    setFormUser({
      username: user.username,
      email: user.email,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await UsersService.update(
      user.id,
      formuser.username.replaceAll(" ", ""),
      formuser.email.replaceAll(" ", "")
    );
    console.log(response);
    setUser({ ...user, username: formuser.username, email: formuser.email });
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
