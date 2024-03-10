import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Button from "../../button/button";
import mstyles from "./createmodal.module.css";
import { useState } from "react";
import UsersService from "../../../services/users/users";

function CreateUserModal({ isOpen, closeHandle, addUser, users }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const styles = {
    overlay: {
      backgroundColor: "rgba(187, 187, 187, 0.75)",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      borderRadius: "8px",
      padding: "40px 40px 25px 40px",
      width: "450px",
    },
  };

  const submitHandle = async (ev) => {
    ev.preventDefault();
    const user = await UsersService.create(
      username,
      email,
      password,
      repassword
    );
    addUser([...users, user.user]);
    console.log(user);
  };

  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <h2 className={mstyles.modalHead}>Создание пользователя</h2>
      <form method="post">
        <div className={mstyles.input_wrapper}>
          <input
            className={mstyles.input}
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <input
            className={mstyles.input}
            type="email"
            name="email"
            placeholder="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className={mstyles.input}
            type="text"
            name="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className={mstyles.input}
            type="text"
            name="repassword"
            placeholder="Подтверждение пароля"
            onChange={(e) => setRePassword(e.target.value)}
            value={repassword}
          />
        </div>
        <div className={mstyles.button_row}>
          <Button
            buttonStyle={"primary"}
            buttonText={"Создать"}
            clickHande={submitHandle}
          />
          <Button
            clickHande={() => closeHandle(false)}
            buttonStyle={"secondary"}
            buttonText={"Закрыть"}
          />
        </div>
      </form>
    </ReactModal>
  );
}

CreateUserModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addUser: PropTypes.func,
  users: PropTypes.any,
};

export default CreateUserModal;
