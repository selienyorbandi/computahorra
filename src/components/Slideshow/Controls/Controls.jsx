import styles from "./styles.module.css";

function Controls({ toLeft, toRight }) {
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
