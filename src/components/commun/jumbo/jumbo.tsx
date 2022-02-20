import React from "react";
import "./jumbo.scss";

export const Jumbo: React.FC<{ background?: string }> = ({
  children,
  background,
}) => {
  const backgroundImage = background
    ? require(`../../../images/backgrounds/${background}`).default
    : undefined;
  return (
    <div
      className="jumbo"
      style={{
        background: "linear-gradient(var(--secondary), 20%, var(--ternary))",
      }}
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="jumbo-content">{children}</div>
    </div>
  );
};
