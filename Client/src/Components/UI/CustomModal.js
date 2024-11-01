import classes from './CustomModal.module.css';
import React, { useEffect } from 'react';

function CustomModal(props) {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    const handleBackdropClick = (event) => {
      if (event.target.classList.contains(classes.overlay)) {
        handleClose();
      }
    };

    document.addEventListener('click', handleBackdropClick);

    return () => {
      document.removeEventListener('click', handleBackdropClick);
    };
  }, [handleClose]);

  return (
        <div className={classes.overlay}>
          <div className={classes.overlay_content}>
            <button className={`btn btn-danger mx-auto ${classes.close_btn}`} onClick={handleClose}>
              Close
            </button>
            {props.children}
          </div>
        </div>
  );
}

export default CustomModal;
