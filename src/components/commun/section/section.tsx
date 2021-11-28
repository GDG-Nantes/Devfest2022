import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{ variant?: "primary" | "secondary" }> =
  ({ children, variant = "primary" }) => (
    <div className={"section " + variant}>{children}</div>
  );
