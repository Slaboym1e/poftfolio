import PropTypes from "prop-types";
import PageHead from "../pagehead/pagehead";
import { useEffect, useState } from "react";
import ListRow from "../listrow/listrow";
import EventsService from "../../../services/events/events";
import ImgRow from "../imgrow/imgrow";

const EventUsers = ({ id }) => {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    const getAchievements = async () => {
      if (id !== undefined)
        setAchievements(await EventsService.getAchievementsByEventId(id));
    };

    getAchievements();
  }, [id]);

  const achievementsMapper = () => {
    return [...achievements].reverse().map((achieve) => (
      <ListRow key={achieve.id} isWarning={!achieve.approve}>
        <p>{achieve.title}</p>
        <p>{achieve.approve}</p>
        <p>{achieve.UserId}</p>
        {achieve.approve ? (
          <img src="/delete.svg" />
        ) : (
          <ImgRow
            firstImage={{ src: "/done.svg", alt: "Подтвердить" }}
            secondImage={{ src: "/close.svg", alt: "Удалить" }}
          />
        )}
      </ListRow>
    ));
  };
  return (
    <div className="controlpage__background">
      <PageHead createHandle={() => console.log(true)}>
        <h2>Участники</h2>
      </PageHead>
      <div className="page__body">
        {achievements !== null ? achievementsMapper() : <>Loading...</>}
      </div>
    </div>
  );
};

EventUsers.propTypes = {
  id: PropTypes.string,
};

export default EventUsers;
