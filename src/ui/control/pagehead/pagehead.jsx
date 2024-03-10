import Button from "../../button/button";
import styles from "./pagehead.module.css";
import PropTypes from "prop-types";

const PageHead = ({ headText, createHandle }) => {
  return (
    <div className={styles.page__header}>
      <h1>{headText}</h1>
      <Button
        buttonType="secondary"
        buttonText="Создать"
        clickHande={createHandle}
      />
    </div>
  );
};

PageHead.propTypes = {
  createHandle: PropTypes.func,
  headText: PropTypes.string,
};

export default PageHead;
