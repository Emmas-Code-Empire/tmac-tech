"use client";

import React, { useState } from "react";
import styles from "./Button.module.css";
import Link from "next/link";
import { BaseComponentStyles } from "@/types/components.types";
import {
  DynamicIcon,
  DynamicIconConfig,
} from "../DynamicIcon/DynamicIcon.component";
import wait from "@/utils/wait";
import RingSpinner, {
  RingSpinnerConfig,
} from "../RingSpinner/RingSpinner.component";

export type ButtonConfig = {
  style: BaseComponentStyles;
  ariaLabel: string;
  text?: string;
  onClick?: () => any;
  icon?: DynamicIconConfig["name"];
  iconBefore?: boolean;
  link?: string;
  newTab?: boolean; // <-- Added newTab config
  label?: {
    position: "left" | "center" | "right";
    text: string;
    color?: string;
  };
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({ config }: { config: ButtonConfig }) => {
  const {
    style,
    ariaLabel,
    onClick,
    text,
    icon,
    iconBefore,
    link,
    newTab, // <-- Destructured newTab
    label,
    disabled,
    loading,
  } = config;

  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(true);

  const ButtonStyles: React.CSSProperties = {
    backgroundColor: style.backgroundColor,
    backgroundImage: style.backgroundImage?.backgroundImageUrl,
    backgroundSize: style.backgroundImage?.backgroundImageSize,
    color: style.color,
    borderTop: style.borderTop,
    borderLeft: style.borderLeft,
    borderRight: style.borderRight,
    borderBottom: style.borderBottom,
    outline: style.outline,
    fontWeight: style.fontWeight,
    boxShadow: style.boxShadow,
    borderRadius: style.borderRadius,
    border: style.border,
    width: style.width,
    opacity: disabled ? "50%" : "100%",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const hitBoxStyles: React.CSSProperties = {
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const iconConfig: DynamicIconConfig = {
    name: icon!,
    size: "15px",
  };

  const showLabel = async () => {
    setOpen(true);
    await wait(0.02);
    setFade(false);
  };

  const hideLabel = async () => {
    setFade(true);
    await wait(0.2);
    setOpen(false);
  };

  const leftLabel = label?.position === "left";
  const rightLabel = label?.position === "right";
  const centerLabel = !leftLabel && !rightLabel;
  const centerTransform = centerLabel ? "-50%" : "0%";

  const labelStyles: React.CSSProperties = {
    opacity: fade ? "0%" : "90%",
    transform: fade
      ? `translate(${centerTransform}, -10%)`
      : `translate(${centerTransform}, 0%)`,
    left: centerLabel ? "50%" : leftLabel ? "0px" : "",
    right: rightLabel ? "0px" : "",
    color: label?.color,
  };

  const buttonOnClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  const ringSpinnerConfig: RingSpinnerConfig = {
    style: {
      color: style.color || "",
      height: "15px",
      lineWidth: "2px",
    },
  };

  const textStyles: React.CSSProperties = {
    opacity: loading ? "0%" : "100%",
  };

  const loadingStyles: React.CSSProperties = {
    opacity: loading ? "100%" : "0%",
  };

  const button = (
    <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        style={ButtonStyles}
        aria-label={ariaLabel}
        onClick={buttonOnClick}
      >
        <div className={styles.text} style={textStyles}>
          {icon && iconBefore && <DynamicIcon config={iconConfig} />}
          {text && <p>{text}</p>}
          {icon && !iconBefore && <DynamicIcon config={iconConfig} />}
        </div>
        {loading && (
          <div className={styles.loading} style={loadingStyles}>
            <RingSpinner config={ringSpinnerConfig} />
          </div>
        )}
      </button>
      {label && open && (
        <p className={styles.label} style={labelStyles}>
          {label.text}
        </p>
      )}
      {label && (
        <div
          className={styles.hitbox}
          style={hitBoxStyles}
          onMouseEnter={showLabel}
          onMouseLeave={hideLabel}
          onClick={buttonOnClick}
        ></div>
      )}
    </div>
  );

  // Conditional logic for opening links in a new tab
  return link ? (
    <Link
      href={link}
      prefetch
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {button}
    </Link>
  ) : (
    button
  );
};

export default Button;
