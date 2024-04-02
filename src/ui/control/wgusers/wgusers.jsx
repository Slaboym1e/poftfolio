import { useEffect, useState } from "react";
import PageHead from "../pagehead/pagehead";
import PropTypes from "prop-types";
import WorkGroupService from "../../../services/workgroups/workgroups";
import ListRow from "../listrow/listrow";
import AddWGUsersModal from "../../modals/addwgusers/addwgusers";

const WGUsers = ({ id }) => {
  const [users, setUsers] = useState(null);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (id !== null) setUsers(await WorkGroupService.getUsersListByWGId(id));
    };
    getData();
  }, [id]);

  const usersMapper = () => {
    return users.map((elem) => (
      <ListRow key={elem.id}>
        <p>
          {elem.soname} {elem.name}
        </p>
      </ListRow>
    ));
  };
  return (
    <div className="controlpage__background">
      <AddWGUsersModal
        isOpen={createIsOpen}
        closeHandle={setCreateIsOpen}
        users={users}
        addUsers={setUsers}
        classId={id}
      />
      <PageHead createHandle={() => setCreateIsOpen(true)}>
        <h2>Ученики</h2>
      </PageHead>
      <div className="page__body">
        {users !== null ? usersMapper() : <>Загрузка...</>}
      </div>
    </div>
  );
};

WGUsers.propTypes = {
  id: PropTypes.string,
};

export default WGUsers;
