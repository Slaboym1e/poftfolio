import mstyles from "./createevent.module.css";
import Button from "../../button/button";
import BaseModal from "../basemodal";
import PropTypes from "prop-types";
import { useState } from "react";
import EventsService from "../../../services/events/events";

function CreateEventModal({ isOpen, closeHandle, addEvent, events }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const submitHandle = async (ev) => {
    ev.preventDefault();
    const event = await EventsService.create(
      title,
      description,
      startDate,
      endDate
    );
    addEvent([event, ...events]);
    console.log("event");
  };

  return (
    <BaseModal isOpen={isOpen} headText="Создание мероприятия">
      <form className={mstyles.input_wrapper}>
        <input
          type="title"
          placeholder="Название"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Описание"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          name="start_date"
          id="start_date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          name="end_date"
          id="end_date"
          onChange={(e) => setEndDate(e.target.value)}
        />
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
    </BaseModal>
  );
}

CreateEventModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addEvent: PropTypes.func,
  events: PropTypes.array,
};

export default CreateEventModal;
