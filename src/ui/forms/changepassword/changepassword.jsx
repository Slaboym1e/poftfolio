//import { useState } from "react";
import { useState } from "react";
import Button from "../../button/button";
import styles from "./changepassword.module.css";
import PropTypes from "prop-types";
import UsersService from "../../../services/users/users";

function ChangePasswordForm({ user }) {
  const [passwordState, setPassword] = useState({
    password: "",
    repassword: "",
  });

  const confirm = async (e) => {
    e.preventDefault();
    console.log(passwordState);
    const resp = await UsersService.changePass(user.id, passwordState.password);
    console.log(resp);
  };

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Новый пароль
        <input
          className={styles.text__input}
          type="text"
          value={passwordState.password}
          onChange={(e) =>
            setPassword({ ...passwordState, password: e.target.value })
          }
        />
      </label>
      <label className={styles.label}>
        Подтверждение нового пароля
        <input
          className={styles.text__input}
          type="text"
          value={passwordState.repassword}
          onChange={(e) =>
            setPassword({ ...passwordState, repassword: e.target.value })
          }
        />
      </label>
      <Button
        buttonStyle="primary"
        buttonText="Изменить пароль"
        clickHande={(e) => confirm(e)}
      />
    </form>
  );
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default ChangePasswordForm;
