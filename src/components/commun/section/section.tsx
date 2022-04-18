import classNames from "classnames";
import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "secondary" | "tertiary";
  slim?: boolean;
  noPadding?: boolean;
}> = ({ children, variant = "primary", slim, noPadding }) => (
  <div
    className={classNames(
      "section",
      variant,
      slim && "slim",
      noPadding && "noPadding"
    )}
  >
    {children}
  </div>
);

type Section = React.FC<{ slim?: boolean; noPadding?: boolean }>;

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
