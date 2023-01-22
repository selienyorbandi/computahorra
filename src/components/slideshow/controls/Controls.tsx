import styles from "./styles.module.css";

type ControlsProps = {
  toLeft: () => void;
  toRight: () => void;
};

function Controls({ toLeft, toRight }: ControlsProps) {
  return (
    <>
      <button className={styles.Control__left} onClick={() => toLeft()}>
        {"<"}
      </button>
      <button className={styles.Control__right} onClick={() => toRight()}>
        {">"}
      </button>
    </>
  );
}

export default Controls;
