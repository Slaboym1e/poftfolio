import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersService from "../../../services/users/users";
import PageHead from "../../../ui/control/pagehead/pagehead";
import styles from "./user.module.css";
import ListRow from "../../../ui/control/listrow/listrow";
import EditUserForm from "../../../ui/forms/edituser/edituser";
import ChangePasswordForm from "../../../ui/forms/changepassword/changepassword";

const User = () => {
  let { id } = useParams();
  const [user, setUser] = useState(null);

  const [roles, setRoles] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersService.getById(id);
      setUser(data);
    };
    const fetchRoles = async () => {
      const data = await UsersService.getRoles(id);
      setRoles(data);
      console.log(roles);
    };

    fetchData();
    fetchRoles();
  }, [id]);
  //console.log(user);
  const roleMapper = () => {
    return roles.map((role) => (
      <ListRow key={role.Role.id}>
        <p>{role.Role.name}</p>
      </ListRow>
    ));
  };

  return (
    <div className={styles.page__compose}>
      <PageHead backLink={"/control/users"}>
        <h1>Изменение пользователя</h1>
      </PageHead>
      <div className={styles.forms__wrapper}>
        <div className="controlpage__background">
          <PageHead>
            <h2>Основная информация</h2>
          </PageHead>
          <div className="page__body">
            {user !== null ? (
              <EditUserForm user={user} setUser={setUser} />
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
        <div className="controlpage__background">
          <PageHead>
            <h2>Изменение пароля</h2>
          </PageHead>
          <div className="page__body">
            {user !== null ? <ChangePasswordForm user={user} /> : <>Loading</>}
          </div>
        </div>
      </div>
      <div className="controlpage__background">
        <PageHead>
          <h2>Группы</h2>
        </PageHead>
        <div className="page__body">
          {roles === null ? <>Загрузка...</> : roleMapper()}
        </div>
      </div>
    </div>
  );
};

export default User;
