import styles from "./imgrow.module.css";
import PropTypes from "prop-types";

const ImgRow = ({ controlObj, editFunc, deleteFunc }) => {
  return (
    <div className={styles.group}>
      <img
        onClick={() => editFunc(controlObj)}
        className={styles.item}
        src="/edit.svg"
        alt="Изменение"
        width="24"
        height="24"
        title="Подробнее/Изменить"
      />
      <img
        className={styles.item}
        onClick={() => deleteFunc(controlObj)}
        src="/delete.svg"
        alt="Удаление"
        width="24"
        height="24"
        title="Удалить"
      />
    </div>
  );
};

ImgRow.propTypes = {
  controlObj: PropTypes.object,
  deleteFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default ImgRow;
