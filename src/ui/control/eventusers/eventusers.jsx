import PropTypes from "prop-types";
import PageHead from "../pagehead/pagehead";
import { useEffect, useState } from "react";
import EventsService from "../../../services/events/events";
import EventUsersTable from "../../tables/eventusers";

const EventUsers = ({ id }) => {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    const getAchievements = async () => {
      if (id !== undefined)
        setAchievements(await EventsService.getAchievementsByEventId(id));
    };

    getAchievements();
  }, [id]);

  return (
    <div className="controlpage__background">
      <PageHead createHandle={() => console.log(true)}>
        <h2>Участники</h2>
      </PageHead>
      <div className="page__body">
        <EventUsersTable achievemnts={achievements} />
      </div>
    </div>
  );
};

EventUsers.propTypes = {
  id: PropTypes.string,
};

export default EventUsers;
