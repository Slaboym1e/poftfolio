import { useMemo } from "react";
import styles from "./button.module.css";
import PropTypes from "prop-types";

const Button = ({ buttonText, clickHande, buttonStyle }) => {
  const buttonStyles = useMemo(
    () =>
      new Map([
        ["primary", styles.btn_primary],
        ["secondary", styles.btn_secondary],
      ]),
    []
  );
  return (
    <button
      className={styles.button + " " + buttonStyles.get(buttonStyle)}
      onClick={clickHande}
    >
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  clickHande: PropTypes.func,
  buttonStyle: PropTypes.string,
};

export default Button;
