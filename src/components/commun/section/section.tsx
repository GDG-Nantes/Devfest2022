import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "secondary";
}> = ({ children, variant = "primary" }) => (
  <div className={"section " + variant}>{children}</div>
);

export const SecondarySection: React.FC = ({ children }) => (
  <DefaultSection variant="secondary">{children}</DefaultSection>
);
export const PrimarySection: React.FC = ({ children }) => (
  <DefaultSection variant="primary">{children}</DefaultSection>
);
