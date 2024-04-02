import styles from "./createworkgroup.module.css";
import Button from "../../button/button";
import BaseModal from "../basemodal";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../../lib/providers/authprovider";
import WorkGroupService from "../../../services/workgroups/workgroups";

function CreateWGModal({ isOpen, closeHandle, addWG, workgroups }) {
  const [form, setForm] = useState({
    title: "",
  });

  const { user } = useContext(AuthContext);
  const submitHandle = async (ev) => {
    ev.preventDefault();
    let wgroup = await WorkGroupService.create(form.title);
    wgroup.Author = {
      username: user.username,
      name: user.name,
      soname: user.soname,
    };
    addWG([wgroup, ...workgroups]);
    closeHandle();
  };

  return (
    <BaseModal isOpen={isOpen} headText="Создание класса">
      <form className={styles.input_wrapper} onSubmit={(e) => submitHandle(e)}>
        <input
          type="text"
          placeholder="Название"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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

CreateWGModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addWG: PropTypes.func,
  workgroups: PropTypes.array,
};

export default CreateWGModal;
