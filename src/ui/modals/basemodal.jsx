import ReactModal from "react-modal";
import mstyles from "./basemodal.module.css";
import PropTypes from "prop-types";

function BaseModal({ children, isOpen, headText }) {
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
      width: "450px",
    },
  };
  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <h2 className={mstyles.modalHead}>{headText}</h2>
      {children}
    </ReactModal>
  );
}

BaseModal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  headText: PropTypes.string,
};

export default BaseModal;
