import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "secondary" | "tertiary";
}> = ({ children, variant = "primary" }) => (
  <div className={"section " + variant}>{children}</div>
);

export const SecondarySection: React.FC = ({ children }) => (
  <DefaultSection variant="secondary">{children}</DefaultSection>
);
export const PrimarySection: React.FC = ({ children }) => (
  <DefaultSection variant="primary">{children}</DefaultSection>
);
export const TertiarySection: React.FC = ({ children }) => (
  <DefaultSection variant="tertiary">{children}</DefaultSection>
);
