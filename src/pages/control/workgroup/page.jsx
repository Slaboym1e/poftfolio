import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./workgroup.module.css";
import PageHead from "../../../ui/control/pagehead/pagehead";
import WorkGroupService from "../../../services/workgroups/workgroups";
import EditWGForm from "../../../ui/forms/editworkgroup/editworkgroup";
import WGUsers from "../../../ui/control/wgusers/wgusers";

const WorkGroup = () => {
  let { id } = useParams();
  const [workgroup, setWorkGroup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await WorkGroupService.getById(id);
      setWorkGroup(data);
    };

    fetchData();
  }, [id]);
  return (
    <div className={styles.page__compose}>
      <PageHead backLink="/control/workgroups">
        <h1>Изменение класса</h1>
      </PageHead>
      <div className="controlpage__background">
        <PageHead>
          <h2>Основная информация</h2>
        </PageHead>
        <div className="page__body">
          {workgroup !== null ? (
            <EditWGForm wgData={workgroup} setWorkGroup={setWorkGroup} />
          ) : (
            <>Загрузка...</>
          )}
        </div>
      </div>
      <WGUsers id={workgroup !== null ? id : null} />
    </div>
  );
};

export default WorkGroup;
