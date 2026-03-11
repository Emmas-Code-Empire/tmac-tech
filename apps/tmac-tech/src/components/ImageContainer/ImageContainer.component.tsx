"use client";

import Image from "next/image";
import styles from "./ImageContainer.module.css";
import React, { useState } from "react";
import wait from "@/utils/wait";

export type ImageContainerConfig = {
  src: string;
  aspectRatio: string;
  alt: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  loadingShimmer?: boolean;
  blur?: string;
  noFade?: boolean;
  onClick?: () => any;
};

const ImageContainer = ({ config }: { config: ImageContainerConfig }) => {
  const {
    src,
    aspectRatio,
    alt,
    height,
    className,
    style,
    loadingShimmer,
    blur,
    onClick,
  } = config;

  const [fade, setFade] = useState(config.noFade ? true : false);
  const [showShimmer, setShowShimmer] = useState(true);

  const handleImageLoad = async () => {
    setFade(true);
    await wait(0.2);
    setShowShimmer(false);
  };

  const imgaeContainerStyles: React.CSSProperties = {
    ...style,
    aspectRatio,
    height,
  };

  return (
    <div
      className={`${styles.imageContainer} ${className} ${
        loadingShimmer && showShimmer && "loading-shimmer"
      }`}
      style={imgaeContainerStyles}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        style={{ opacity: fade ? "100%" : "0%" }}
        blurDataURL={blur}
        onLoad={handleImageLoad}
        fill
        preload
      />
    </div>
  );
};

export default ImageContainer;
