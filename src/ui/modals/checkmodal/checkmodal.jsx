import PropTypes from "prop-types";
import Button from "../../button/button";
import mstyles from "./checkmodal.module.css";
import BaseModal from "../basemodal";

function CheckModal({ isOpen, closeHandle, submitHandle }) {
  return (
    <BaseModal isOpen={isOpen} headText="Подтвердите действие">
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
    </BaseModal>
  );
}

CheckModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  submitHandle: PropTypes.func,
};

export default CheckModal;
