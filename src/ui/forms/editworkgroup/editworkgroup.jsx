import PropTypes from "prop-types";
import styles from "./editworkgroup.module.css";
import Button from "../../button/button";
import { useEffect, useState } from "react";
import WorkGroupService from "../../../services/workgroups/workgroups";

const EditWGForm = ({ wgData, setWorkGroup }) => {
  const [formevent, setFormEvent] = useState({
    title: "",
  });

  useEffect(() => {
    const dataSet = () => {
      console.log(wgData);
      setFormEvent({
        title:
          wgData.title === undefined || wgData.title === null
            ? ""
            : wgData.title,
      });
    };
    dataSet();
  }, [wgData]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await WorkGroupService.update(wgData.id, formevent.title);
    if (res.update)
      setWorkGroup({
        ...wgData,
        title: formevent.title,
      });
    console.log("Submit");
  };
  const resetForm = (e) => {
    e.preventDefault();
    setFormEvent({
      username: wgData.title,
    });
  };

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Название
        <input
          type="text"
          placeholder="Название мероприятия"
          value={formevent.title}
          onChange={(e) =>
            setFormEvent({ ...formevent, title: e.target.value })
          }
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
};

EditWGForm.propTypes = {
  wgData: PropTypes.object,
  setWorkGroup: PropTypes.func,
};

export default EditWGForm;
