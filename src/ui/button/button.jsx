import { useMemo } from "react";
import styles from "./button.module.css";
import PropTypes from "prop-types";

const Button = ({ buttonText, clickHande, buttonStyle, disabled }) => {
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
      disabled={disabled}
      className={styles.button + " " + buttonStyles.get(buttonStyle)}
      onClick={clickHande}
    >
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  clickHande: PropTypes.func,
  buttonStyle: PropTypes.string,
};

export default Button;
