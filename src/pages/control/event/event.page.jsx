import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHead from "../../../ui/control/pagehead/pagehead";
import styles from "./event.module.css";
import EventUsers from "../../../ui/control/eventusers/eventusers";
import EventsService from "../../../services/events/events";
import EditEventForm from "../../../ui/forms/editevent/editevent";

const Event = () => {
  let { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      setEvent(await EventsService.getById(id));
    };

    getEvent();
  }, [id]);

  return (
    <div className={styles.page__compose}>
      <PageHead backLink={"/control/events"}>
        <h1>Изменение мероприятия</h1>
      </PageHead>
      <div className="controlpage__background">
        <PageHead>
          <h2>Основная информация</h2>
        </PageHead>
        <div className="page__body">
          {event !== null ? (
            <EditEventForm eventData={event} setEvent={setEvent} />
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>

      <EventUsers id={event !== null ? id : undefined} />
    </div>
  );
};

export default Event;
