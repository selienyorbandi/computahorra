import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ReactPortal from "../portal/ReactPortal";
import styles from "./styles.module.css";

function Modal({
  children,
  isOpen,
  handleClose,
}: {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = () => {
    handleClose(false);
  };

  useOnClickOutside(modalRef, clickOutsideHandler);

  return (
    <ReactPortal>
      {isOpen ? (
        <div className={styles.Modal__BackDrop}>
          <div className={styles.Modal} ref={modalRef}>
            <FontAwesomeIcon
              icon={faClose}
              name={"Cerrar"}
              color="rgba(0, 0, 0, 0.534)"
              onClick={() => handleClose(false)}
              className={styles.Modal__CloseBtn}
            />
            <div className={styles.Modal__content}>{children}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </ReactPortal>
  );
}
export default Modal;
