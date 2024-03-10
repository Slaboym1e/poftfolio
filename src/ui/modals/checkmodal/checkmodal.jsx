import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Button from "../../button/button";
import mstyles from "./checkmodal.module.css";

function CheckModal({ isOpen, closeHandle, submitHandle }) {
  const styles = {
    overlay: {
      backgroundColor: "rgba(187, 187, 187, 0.75)",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      borderRadius: "8px",
      padding: "40px 40px 25px 40px",
    },
  };

  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <p>Подвердите действие</p>
      <div className={mstyles.button_row}>
        <Button
          clickHande={submitHandle}
          buttonStyle={"primary"}
          buttonText={"Подтвердить"}
        />
        <Button
          clickHande={() => closeHandle(false)}
          buttonStyle={"secondary"}
          buttonText={"Отмена"}
        />
      </div>
    </ReactModal>
  );
}

CheckModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  submitHandle: PropTypes.func,
};

export default CheckModal;
