import { ButtonConfig } from "@/components/Button/Button.component";

export const primaryButtonStyleConfig: ButtonConfig["style"] = {
  color: "var(--bw100)",
  backgroundColor: "var(--bw900)",
  backgroundImage: {
    backgroundImageUrl: "linear-gradient(var(--bw700), var(--bw800))",
    backgroundImageSize: "cover",
  },
  borderTop: "1px solid var(--bw600)",
  borderLeft: "1px solid var(--bw700)",
  borderRight: "1px solid var(--bw700)",
  borderBottom: "1px solid var(--bw700)",
  outline: "1px solid var(--bw900)",
  fontWeight: "600",
  boxShadow: "var(--elementShadowBg)",
};

export const secondaryButtonStyleConfig: ButtonConfig["style"] = {
  color: "var(--bw900)",
  backgroundColor: "var(--bw100)",
  backgroundImage: {
    backgroundImageUrl: "linear-gradient(var(--bw100), var(--bw300))",
    backgroundImageSize: "cover",
  },
  borderTop: "1px solid var(--bw100)",
  borderLeft: "1px solid var(--bw200)",
  borderRight: "1px solid var(--bw200)",
  borderBottom: "1px solid var(--bw200)",
  outline: "1px solid var(--bw300)",
  fontWeight: "500",
  boxShadow: "var(--elementShadowfg)",
};

export const skeletonDarkButtonStyleConfig: ButtonConfig["style"] = {
  color: "var(--bw900)",
  backgroundColor: "var(--bw200)",
  border: "1px solid transparent",
};

export const skeletonLightButtonStyleConfig: ButtonConfig["style"] = {
  color: "var(--bw900)",
  backgroundColor: "var(--bw100)",
  border: "1px solid transparent",
};

export const activeButtonStyleConfig: ButtonConfig["style"] = {
  color: "var(--primaryColor)",
  backgroundColor: "var(--bw200)",
  boxShadow: "var(--elementShadowBg)",
  border: "1px solid var(--bw300)",
};
