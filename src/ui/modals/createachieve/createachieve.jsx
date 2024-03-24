import PropTypes from "prop-types";
import BaseModal from "../basemodal";
import Button from "../../button/button";
import { useState } from "react";
import AchieventService from "../../../services/achievemnts/achievements";
import styles from "./createachieve.module.css";

const CreateAchieveModal = ({
  isOpen,
  closeHandle,
  userId,
  achievements,
  setAchievements,
}) => {
  const [newAchieveForm, setNewAchieveForm] = useState({
    eventId: "",
    title: "",
    error: false,
  });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("ok");
    if (
      userId !== undefined &&
      userId > 0 &&
      newAchieveForm.eventId !== "" &&
      newAchieveForm.eventId > 0
    ) {
      let data = await AchieventService.add(
        userId,
        newAchieveForm.eventId,
        newAchieveForm.title
      );
      console.log(data);
      if (data) {
        setAchievements([data, ...achievements]);
        setNewAchieveForm({ eventId: "", title: "", error: false });
        closeHandle(false);
      } else setNewAchieveForm({ ...newAchieveForm, error: true });
    }
  };

  return (
    <BaseModal headText="Добавление достижения" isOpen={isOpen}>
      <form className={styles.input_wrapper}>
        <label className={styles.label}>
          ID мероприятия
          <input
            className={styles.input}
            placeholder="eventId"
            value={newAchieveForm.eventId}
            onChange={(e) =>
              setNewAchieveForm({ ...newAchieveForm, eventId: e.target.value })
            }
          />
        </label>
        <label className={styles.label}>
          Название
          <input
            className={styles.input}
            placeholder="title"
            value={newAchieveForm.title}
            onChange={(e) =>
              setNewAchieveForm({ ...newAchieveForm, title: e.target.value })
            }
          />
        </label>
        {newAchieveForm.error ? <p>Что-то пошло не так</p> : <></>}
        <div className={styles.button_row}>
          <Button
            buttonText="Добавить"
            clickHande={(e) => submitForm(e)}
            buttonType="button"
          />
          <Button
            buttonText="Закрыть"
            clickHande={() => closeHandle(false)}
            buttonType="button"
          />
        </div>
      </form>
    </BaseModal>
  );
};

CreateAchieveModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  userId: PropTypes.string,
  achievements: PropTypes.array,
  setAchievements: PropTypes.func,
};

export default CreateAchieveModal;
