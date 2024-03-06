import ReactModal from "react-modal";
import PropTypes from 'prop-types'


 function CheckModal ({isOpen, closeHandle, submitHandle}) {
    const styles={
        content:{
            top:'40%',
            left:'50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '8px' 

        }
    }

    return (
        <ReactModal isOpen={isOpen} style={styles}>
            <p>Подвердите действие</p>
            <div>
                <button  onClick={submitHandle}>Подтвердить</button>
                <button onClick={closeHandle}>Закрыть</button>
            </div>
        </ReactModal>
    )
}

CheckModal.propTypes= {
    isOpen:PropTypes.bool,
    closeHandle: PropTypes.func,
    submitHandle: PropTypes.func
}

export default CheckModal;