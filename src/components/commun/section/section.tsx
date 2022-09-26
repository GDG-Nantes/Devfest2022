import classNames from "classnames";
import React, { CSSProperties } from "react";
import "./section.scss";

export const DefaultSection: React.FC<{
  variant?: "primary" | "primary-dark" | "secondary" | "tertiary";
  slim?: boolean;
  padding?: "normal" | "none" | "small";
  style?: CSSProperties;
  className?: string;
}> = ({
  children,
  variant = "primary",
  slim,
  padding = "normal",
  style,
  className,
}) => (
  <div
    style={style}
    className={classNames(
      "section",
      variant,
      slim && "slim",
      padding && "padding-" + padding,
      className
    )}
  >
    {children}
  </div>
);

type Section = React.FC<{
  slim?: boolean;
  padding?: "normal" | "none" | "small";
  style?: CSSProperties;
  className?: string;
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
