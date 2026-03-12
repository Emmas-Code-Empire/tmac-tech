import React, { RefObject } from "react";

import styles from "./Input.module.css";

export type InputConfig = {
  label: string;
  ref: RefObject<HTMLInputElement | null>;
};

const Input = ({ config }: { config: InputConfig }) => {
  const { label, ref } = config;

  return (
    <div className={styles.input}>
      <label htmlFor={label}>
        <p>{label}</p>
      </label>
      <input id={label} ref={ref} required />
    </div>
  );
};

export default Input;
