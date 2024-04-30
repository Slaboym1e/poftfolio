import { useEffect, useState } from "react";
import PageHead from "../../../ui/control/pagehead/pagehead";
import WorkGroupService from "../../../services/workgroups/workgroups";
import CreateWGModal from "../../../ui/modals/createworkgroup/createworkgroup";
import { useNavigate } from "react-router-dom";
import CheckModal from "../../../ui/modals/checkmodal/checkmodal";
import WorkgroupsTable from "../../../ui/tables/workgroupstable";

const WorkGroups = () => {
  let navigate = useNavigate();
  const [wgroups, setWGroups] = useState(null);
  const [createIsOpen, createSetOpen] = useState(false);
  const [delIsOpen, setDelOpen] = useState(false);
  const [selWG, setSelWG] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setWGroups(await WorkGroupService.getAll());
    };
    getData();
  }, []);
  function modalOpen(wgroup) {
    setSelWG(wgroup);
    setDelOpen(true);
  }
  function delWG() {
    console.log(WorkGroupService.removeById(selWG.id));
    setWGroups(wgroups.filter((u) => u.id !== selWG.id));
    setDelOpen(false);
  }
  return (
    <div className="controlpage__background">
      <CreateWGModal
        isOpen={createIsOpen}
        closeHandle={createSetOpen}
        workgroups={wgroups}
        addWG={setWGroups}
      />
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelOpen}
        submitHandle={delWG}
      />
      <PageHead createHandle={() => createSetOpen(true)}>
        <h1>Список классов</h1>
      </PageHead>
      <div className="page__body">
        <WorkgroupsTable
          workgroups={wgroups}
          editFunc={(control) =>
            navigate(`/control/workgroups/${control.id}`, {
              state: { prev: "/control/workgroups" },
            })
          }
          delFunc={modalOpen}
        />
      </div>
    </div>
  );
};

export default WorkGroups;
