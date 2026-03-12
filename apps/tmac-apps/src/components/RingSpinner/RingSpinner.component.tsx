import React from "react";
import styles from "./RingSpinner.module.css";

export interface RingSpinnerProps {
  color: string;
}

export type RingSpinnerConfig = {
  style: {
    color: string;
    height: string;
    lineWidth: string;
  };
};

const RingSpinner = ({ config }: { config: RingSpinnerConfig }) => {
  const { style } = config;

  const spinnerStyles: React.CSSProperties = {
    height: style.height,
    width: style.height,
    border: `${style.lineWidth} solid ${style.color}`,
    borderColor: `${style.color} transparent transparent transparent`,
  };

  return (
    <div className={styles.spinner}>
      <div style={spinnerStyles}></div>
      <div style={spinnerStyles}></div>
      <div style={spinnerStyles}></div>
      <div style={spinnerStyles}></div>
    </div>
  );
};

export default RingSpinner;
