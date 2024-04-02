import { useEffect, useState } from "react";
import UsersService from "../../../services/users/users";
import ReactModal from "react-modal";
import CheckModal from "../../../ui/modals/checkmodal/checkmodal";
import CreateUserModal from "../../../ui/modals/createuser/createuser";
import PageHead from "../../../ui/control/pagehead/pagehead";
import ListRow from "../../../ui/control/listrow/listrow";
import ImgRow from "../../../ui/control/imgrow/imgrow";
import { useNavigate } from "react-router-dom";

ReactModal.setAppElement("#root");

const statusTransform = (statusNum) => {
  switch (statusNum) {
    case 1:
      return "Активен";
    case 2:
      return "Заблокирован";
    case 3:
      return "Удален";
    default:
      return "Ошибка";
  }
};

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [createIsOpen, createSetOpen] = useState(false);
  const [userModal, setUserModal] = useState(null);
  //Delete Modal
  function modalOpen(user) {
    setUserModal(user);
    setOpen(true);
  }
  const confirmHandle = () => {
    console.log(UsersService.removeById(userModal.id));
    setUsers(users.filter((u) => u.id !== userModal.id));
    setOpen(false);
  };
  //CreateUserModal
  const createModalOpen = () => {
    createSetOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersService.getAll();
      setUsers(data);
    };

    fetchData();
  }, []);
  const userMapper = () => {
    return users.map((user) => (
      <ListRow key={user.id}>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{statusTransform(user.status)}</p>
        <ImgRow
          controlObj={user}
          deleteFunc={modalOpen}
          editFunc={(control) => navigate(`/control/users/${control.id}`)}
          firstImage={{ src: "/edit.svg", alt: "Изменить/Подробнее" }}
          secondImage={{ src: "/delete.svg", alt: "Удалить" }}
        />
      </ListRow>
    ));
  };

  return (
    <div className="controlpage__background">
      <CheckModal
        isOpen={isOpen}
        closeHandle={setOpen}
        submitHandle={confirmHandle}
      />
      <CreateUserModal
        isOpen={createIsOpen}
        closeHandle={createSetOpen}
        addUser={setUsers}
        users={users}
      />
      <PageHead createHandle={createModalOpen}>
        <h1>Список пользователей</h1>
      </PageHead>
      <div className="page__body">
        <ListRow>
          <p>Имя пользователя</p>
          <p>Email</p>
          <p>Статус</p>
          <p className="w_10"> </p>
          <p className="w_10"> </p>
        </ListRow>
        {users === null ? <>Загрузка...</> : userMapper()}
      </div>
    </div>
  );
};

export default Users;
