import styles from "./addwgusers.module.css";
import Button from "../../button/button";
import BaseModal from "../basemodal";
import PropTypes from "prop-types";
import { useState } from "react";
import WorkGroupService from "../../../services/workgroups/workgroups";
import UsersService from "../../../services/users/users";

function AddWGUsersModal({ isOpen, closeHandle, addUsers, users, classId }) {
  const [form, setForm] = useState({
    userId: "",
  });

  const submitHandle = async (ev) => {
    ev.preventDefault();
    let user = await WorkGroupService.addUserToWG(classId, form.userId);
    if (user !== null && user !== undefined)
      addUsers([await UsersService.getById(form.userId), ...users]);
    closeHandle();
  };

  return (
    <BaseModal isOpen={isOpen} headText="Добавление пользователя">
      <form className={styles.input_wrapper} onSubmit={(e) => submitHandle(e)}>
        <input
          type="text"
          placeholder="ID пользователя"
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
        />
        <div className={styles.button_row}>
          <Button
            buttonStyle={"primary"}
            buttonText={"Создать"}
            clickHande={submitHandle}
            buttonType="button"
          />
          <Button
            clickHande={() => closeHandle(false)}
            buttonStyle={"secondary"}
            buttonText={"Закрыть"}
            buttonType="button"
          />
        </div>
      </form>
    </BaseModal>
  );
}

AddWGUsersModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addUsers: PropTypes.func,
  users: PropTypes.array,
  classId: PropTypes.string,
};

export default AddWGUsersModal;
