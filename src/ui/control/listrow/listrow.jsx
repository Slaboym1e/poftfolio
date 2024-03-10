import styles from "./listrow.module.css";
import PropTypes from "prop-types";

const ListRow = ({ children }) => {
  return <div className={styles.item}>{children}</div>;
};

ListRow.propTypes = {
  children: PropTypes.any,
};

export default ListRow;
