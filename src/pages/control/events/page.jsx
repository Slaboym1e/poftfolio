import { useEffect, useState } from "react";
import EventsService from "../../../services/events/events";
import ListRow from "../../../ui/control/listrow/listrow";
import ImgRow from "../../../ui/control/imgrow/imgrow";
import PageHead from "../../../ui/control/pagehead/pagehead";
import { dateRangeTranslator } from "../../../lib/translators/date.translator";
import CheckModal from "../../../ui/modals/checkmodal/checkmodal";
import CreateEventModal from "../../../ui/modals/createevent/createevent";
import { useNavigate } from "react-router-dom";

const Events = () => {
  let navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [delIsOpen, setDelOpen] = useState(false);
  const [selEvent, setSelEvent] = useState(null);
  const [createIsOpen, createSetOpen] = useState(false);
  function modalOpen(event) {
    setSelEvent(event);
    setDelOpen(true);
  }
  function delEvent() {
    setEvents(events.filter((u) => u.id !== selEvent.id));
    setDelOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await EventsService.getAll();
      setEvents(data);
    };

    fetchData();
  }, []);

  const eventsMapper = () => {
    return events.map((event) => (
      <ListRow key={event.id}>
        <p>{event.title}</p>
        <p>{dateRangeTranslator(event.start_date, event.end_date)}</p>
        <ImgRow
          controlObj={event}
          deleteFunc={modalOpen}
          editFunc={(control) => navigate(`/control/events/${control.id}`)}
        />
      </ListRow>
    ));
  };

  return (
    <div className="controlpage__background">
      <CreateEventModal
        isOpen={createIsOpen}
        closeHandle={createSetOpen}
        addEvent={setEvents}
        events={events}
      />
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelOpen}
        submitHandle={delEvent}
      />
      <PageHead createHandle={() => createSetOpen(true)}>
        <h1>Список мероприятий</h1>
      </PageHead>
      <div className="page__body">
        {events === null ? <>Загрузка...</> : eventsMapper()}
      </div>
    </div>
  );
};

export default Events;
