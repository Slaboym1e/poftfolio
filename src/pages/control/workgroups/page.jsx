import { useEffect, useState } from "react";
import PageHead from "../../../ui/control/pagehead/pagehead";
import ListRow from "../../../ui/control/listrow/listrow";
import WorkGroupService from "../../../services/workgroups/workgroups";
import CreateWGModal from "../../../ui/modals/createworkgroup/createworkgroup";
import ImgRow from "../../../ui/control/imgrow/imgrow";
import { useNavigate } from "react-router-dom";
import CheckModal from "../../../ui/modals/checkmodal/checkmodal";

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

  const WGMapper = () => {
    return [...wgroups].reverse().map((elem) => (
      <ListRow key={elem.id}>
        <p>{elem.id}</p>
        <p>{elem.title}</p>
        <ImgRow
          controlObj={elem}
          deleteFunc={modalOpen}
          editFunc={(control) => navigate(`/control/workgroups/${control.id}`)}
          firstImage={{ src: "/edit.svg", alt: "Изменить/Подробнее" }}
          secondImage={{ src: "/delete.svg", alt: "Удалить" }}
        />
      </ListRow>
    ));
  };
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
        {wgroups === null ? <>Loading</> : WGMapper()}
      </div>
    </div>
  );
};

export default WorkGroups;
