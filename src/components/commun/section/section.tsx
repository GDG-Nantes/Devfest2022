import classNames from "classnames";
import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "primary-dark" | "secondary" | "tertiary";
  slim?: boolean;
  padding?: "normal" | "none" | "small";
}> = ({ children, variant = "primary", slim, padding = "normal" }) => (
  <div
    className={classNames(
      "section",
      variant,
      slim && "slim",
      padding && "padding-" + padding
    )}
  >
    {children}
  </div>
);

type Section = React.FC<{
  slim?: boolean;
  padding?: "normal" | "none" | "small";
}>;

export const SecondarySection: Section = ({ children, ...props }) => (
  <DefaultSection variant="secondary" {...props}>
    {children}
  </DefaultSection>
);
export const PrimarySection: Section = ({ children, ...props }) => (
  <DefaultSection variant="primary" {...props}>
    {children}
  </DefaultSection>
);
export const TertiarySection: Section = ({ children, ...props }) => (
  <DefaultSection variant="tertiary" {...props}>
    {children}
  </DefaultSection>
);
