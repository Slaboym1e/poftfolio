import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PageHead from "../pagehead/pagehead";
import AchieventService from "../../../services/achievemnts/achievements";
import ListRow from "../listrow/listrow";
import CreateAchieveModal from "../../modals/createachieve/createachieve";

const UserAchievements = ({ id }) => {
  const [achievements, setAchievements] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const getAchievements = async () => {
      const data = await AchieventService.getAllByUserId(id);
      setAchievements(data);
    };
    if (id !== null && typeof id !== "undefined") getAchievements();
  }, [id]);

  const achieveMapper = () => {
    return achievements.map((achieve) => (
      <ListRow key={achieve.id}>
        <p>{achieve.title}</p>
      </ListRow>
    ));
  };

  return (
    <>
      <CreateAchieveModal
        isOpen={modalIsOpen}
        closeHandle={setModalIsOpen}
        achievements={achievements}
        setAchievements={setAchievements}
        userId={id}
      />
      <div className="controlpage__background">
        <PageHead createHandle={() => setModalIsOpen(true)}>
          <h2>Достижения</h2>
        </PageHead>
        <div className="page__body">
          {achievements !== null ? achieveMapper() : <>Loading</>}
        </div>
      </div>
    </>
  );
};

UserAchievements.propTypes = {
  id: PropTypes.string,
};

export default UserAchievements;
