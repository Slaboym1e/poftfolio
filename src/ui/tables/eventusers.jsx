import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const EventUsersTable = ({ achievemnts, delFunc, editFunc }) => {
  const rowMapper = () => {
    return achievemnts.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.id}</p>
        <p className={styles.cell}>{el.title}</p>
        <p className={styles.cell}>{el.approve}</p>
        <p className={styles.cell}>{el.UserId}</p>
        <div className={styles.cell}>
          {el.approve ? (
            <img src="/delete.svg" />
          ) : (
            <ImgRow
              firstImage={{ src: "/done.svg", alt: "Подтвердить" }}
              editFunc={editFunc}
              secondImage={{ src: "/close.svg", alt: "Удалить" }}
              deleteFunc={delFunc}
            />
          )}
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <p className={styles.cell}>id</p>
        <p className={styles.cell}>Название</p>
        <p className={styles.cell}>Статус</p>
        <p className={styles.cell}>Пользователь</p>
        <p className={styles.cell}> </p>
      </div>
      {achievemnts !== null ? rowMapper() : <></>}
    </div>
  );
};

EventUsersTable.propTypes = {
  achievemnts: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default EventUsersTable;
