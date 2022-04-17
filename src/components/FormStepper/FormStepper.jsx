import styles from "./styles.module.css";

function FormStepper({steps, currentStep = 0}) {
  
  return (
    <div className={styles.FormStepper}>
      {steps.map((item, index) => <div key={index}>
        <div className={`${styles.FormStepper__steps}`}>
          <span className={`${styles.FormStepper__nStep} ${currentStep === index ? styles.FormStepper__currentStep : ""}`}> {index+1} </span><h1 className={`${styles.FormStepper__title} ${currentStep === index ? styles.FormStepper__currentTitle : ""}`}>{item}</h1>
        </div>
      </div>)}
    </div>
  );
}

export default FormStepper;