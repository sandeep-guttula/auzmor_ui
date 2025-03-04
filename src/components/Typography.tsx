import React, { ElementType, ReactNode } from "react";

type TypographyProps = {
  as?: ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children: ReactNode;
};

const fontSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl"
};

const fontWeights = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
};

const Typography: React.FC<TypographyProps> = ({
  as: Tag = "p",
  size = "md",
  weight = "normal",
  className = "",
  children,
}) => {
  return (
    <Tag className={`${fontSizes[size]} ${fontWeights[weight]} ${className}`}>
      {children}
    </Tag>
  );
};

export { Typography };
