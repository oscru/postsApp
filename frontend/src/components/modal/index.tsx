import classNames from "classnames";
import Button from "../button";

import styles from "./styles.module.css";

const Modal = (props: any) => {
  const { title, body, button, onSubmit, active, buttonAction } = props;
  return (
    <div className={classNames(styles.modalBlur, active && styles.active)}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modalBody}>
          {props.children}
          <div className={styles.buttons}>
            <Button content={button} action={buttonAction} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
