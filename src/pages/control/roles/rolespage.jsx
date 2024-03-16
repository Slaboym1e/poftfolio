import { useEffect, useState } from "react";
import PageHead from "../../../ui/control/pagehead/pagehead";
import GroupsService from "../../../services/groups/groups";
//import styles from "./rolespage.module.css";
import ListRow from "../../../ui/control/listrow/listrow";
import ImgRow from "../../../ui/control/imgrow/imgrow";

const Roles = () => {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GroupsService.getAll();
      setGroups(data);
    };

    fetchData();
  }, []);

  const groupsMapper = () => {
    return groups.map((group) => (
      <ListRow key={group.id}>
        <p>{group.name}</p>
        <ImgRow
          controlObj={group}
          deleteFunc={(group) => console.log(group.name)}
        />
      </ListRow>
    ));
  };

  return (
    <div className="controlpage__background">
      <PageHead>
        <h1>Список групп</h1>
      </PageHead>
      <div className="page__body">
        {groups === null ? <>Загрузка...</> : groupsMapper()}
      </div>
    </div>
  );
};

export default Roles;
