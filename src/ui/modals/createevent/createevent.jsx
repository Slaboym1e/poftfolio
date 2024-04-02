import mstyles from "./createevent.module.css";
import Button from "../../button/button";
import BaseModal from "../basemodal";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import EventsService from "../../../services/events/events";
import { AuthContext } from "../../../lib/providers/authprovider";

function CreateEventModal({ isOpen, closeHandle, addEvent, events }) {
  const [form, setForm] = useState({
    title: "",
    description: null,
    startDate: null,
    endDate: null,
  });

  const { user } = useContext(AuthContext);
  const submitHandle = async (ev) => {
    ev.preventDefault();
    let event = await EventsService.create(
      form.title,
      form.description,
      form.startDate,
      form.endDate
    );
    event.Author = {
      username: user.username,
      name: user.name,
      soname: user.soname,
    };
    addEvent([event, ...events]);
    closeHandle();
    console.log("event");
  };

  return (
    <BaseModal isOpen={isOpen} headText="Создание мероприятия">
      <form className={mstyles.input_wrapper} onSubmit={(e) => submitHandle(e)}>
        <input
          type="title"
          placeholder="Название"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Описание"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          name="start_date"
          id="start_date"
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="date"
          name="end_date"
          id="end_date"
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <div className={mstyles.button_row}>
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

CreateEventModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addEvent: PropTypes.func,
  events: PropTypes.array,
};

export default CreateEventModal;
