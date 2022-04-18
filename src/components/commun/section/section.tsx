import classNames from "classnames";
import React from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "secondary" | "tertiary";
  slim?: boolean;
}> = ({ children, variant = "primary", slim }) => (
  <div className={classNames("section", variant, slim && "slim")}>
    {children}
  </div>
);

type Section = React.FC<{ slim?: boolean }>;

export const SecondarySection: Section = ({ children, slim }) => (
  <DefaultSection variant="secondary" slim={slim}>
    {children}
  </DefaultSection>
);
export const PrimarySection: Section = ({ children, slim }) => (
  <DefaultSection variant="primary" slim={slim}>
    {children}
  </DefaultSection>
);
export const TertiarySection: Section = ({ children, slim }) => (
  <DefaultSection variant="tertiary" slim={slim}>
    {children}
  </DefaultSection>
);
