import React from "react";
import "./hero.scss";

export const Hero: React.FC<{ background?: string }> = ({
  children,
  background,
}) => {
  const backgroundImage = background
    ? require(`../../../images/backgrounds/${background}`).default
    : undefined;
  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">{children}</div>
    </div>
  );
};
