import React from "react";

import styles from "./StepWrapper.module.css";

export type StepWrapperConfig = {
  step: string;
  heading: string;
  text: string;
  active?: boolean;
};

const StepWrapper = ({
  config,
  children,
}: {
  config: StepWrapperConfig;
  children: React.ReactNode;
}) => {
  const { step, heading, text, active } = config;

  const stepWrapperStyles: React.CSSProperties = {
    opacity: active ? "100%" : "25%",
  };

  return (
    <div className={styles.stepWrapper} style={stepWrapperStyles}>
      <div className={styles.heading}>
        <div>
          <p>{step}</p>
        </div>
        <h2>{heading}</h2>
      </div>
      <hr />
      <div className={styles.body}>
        <p className={styles.text}>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default StepWrapper;
