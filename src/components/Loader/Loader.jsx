import styles from "./styles.module.css";

function Loader() {
    return (
        <div className={styles.skChase}>
            <div className={styles.skChaseDot}></div>
            <div className={styles.skChaseDot}></div>
            <div className={styles.skChaseDot}></div>
            <div className={styles.skChaseDot}></div>
            <div className={styles.skChaseDot}></div>
            <div className={styles.skChaseDot}></div>
        </div>
    );
}

export default Loader;