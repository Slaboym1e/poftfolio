import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AchieventService from "../../../services/achievemnts/achievements";
import PageHead from "../../control/pagehead/pagehead";
import ListRow from "../../control/listrow/listrow";

const PortfolioAchievements = ({ id }) => {
  const [achievements, setAchievements] = useState(null);
  useEffect(() => {
    const getAchievements = async () => {
      const data = await AchieventService.getAllByUserId(id);
      setAchievements(data);
    };
    if (id !== null && typeof id !== "undefined") getAchievements();
  }, [id]);

  const achieveMapper = () => {
    return achievements.map((achieve) => (
      <ListRow key={achieve.id} isWarning={!achieve.approve}>
        <p>{achieve.title}</p>
      </ListRow>
    ));
  };

  return (
    <div className="controlpage__background">
      <PageHead>
        <h2>Достижения</h2>
      </PageHead>
      <div className="page__body">
        {achievements !== null ? achieveMapper() : <>Loading</>}
      </div>
    </div>
  );
};

PortfolioAchievements.propTypes = {
  id: PropTypes.string,
};

export default PortfolioAchievements;
