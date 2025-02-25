import React from "react";

type TestProps = {
  children: React.ReactNode;
};

const Test: React.FC<TestProps> = ({ children }) => {
  return (
    <div className="order-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90">
      {children}
    </div>
  );
};

export { Test };
