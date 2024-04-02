import PropTypes from "prop-types";
import styles from "./editevent.module.css";
import Button from "../../button/button";
import { useEffect, useState } from "react";
import EventsService from "../../../services/events/events";

const EditEventForm = ({ eventData, setEvent }) => {
  const [formevent, setFormEvent] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const dataSet = () => {
      setFormEvent({
        title:
          eventData.title === undefined || eventData.title === null
            ? ""
            : eventData.title,
        description:
          eventData.description === undefined || eventData.description === null
            ? ""
            : eventData.description,
        start_date:
          eventData.start_date === null || eventData.start_date === undefined
            ? ""
            : eventData.start_date,
        end_date:
          eventData.end_date === null || eventData.end_date === undefined
            ? ""
            : eventData.end_date,
      });
    };
    dataSet();
  }, [eventData]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await EventsService.update(
      eventData.id,
      formevent.title,
      formevent.description,
      formevent.start_date == "" ? null : formevent.start_date,
      formevent.end_date == "" ? null : formevent.end_date
    );
    if (res.update)
      setEvent({
        ...eventData,
        title: formevent.title,
        description: formevent.description,
        start_date: formevent.start_date,
        end_date: formevent.end_date,
      });
    console.log("Submit");
  };
  const resetForm = (e) => {
    e.preventDefault();
    setFormEvent({
      username: eventData.title,
      email: eventData.description === null ? "" : eventData.description,
      name: eventData.start_date === null ? "" : eventData.start_date,
      soname: eventData.end_date === null ? "" : eventData.end_date,
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
      <label className={styles.label}>
        Описание
        <textarea
          placeholder="Описание мероприятия"
          value={formevent.description}
          onChange={(e) =>
            setFormEvent({ ...formevent, description: e.target.value })
          }
        />
      </label>

      <label className={styles.label}>
        Дата начала
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={formevent.start_date}
          onChange={(e) =>
            setFormEvent({ ...formevent, start_date: e.target.value })
          }
        />
      </label>
      <label className={styles.label}>
        Дата окончания
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={formevent.end_date}
          onChange={(e) =>
            setFormEvent({ ...formevent, end_date: e.target.value })
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

EditEventForm.propTypes = {
  eventData: PropTypes.object,
  setEvent: PropTypes.func,
};

export default EditEventForm;
