import React, { ElementType, ReactNode } from "react";

type TextProps = {
  as?: ElementType; // Allows rendering as different elements (p, span, h1, etc.)
  children: ReactNode;
  className?: string;
};

const Text: React.FC<TextProps> = ({ as: Tag = "p", children, className = "" }) => {
  return <Tag className={`text-gray-900 dark:text-gray-100 ${className} `}>{children}</Tag>;
};

export { Text };
