import React, { ReactElement } from "react";
import { Hero } from "./hero/hero";
import { Jumbo } from "./jumbo/jumbo";

type PageConfig = {
  title: string;
  description?: string;
  background?: string;
  jumbo?: ReactElement;
};

export const DefaultPage: React.FC<PageConfig> = ({ children, ...config }) => {
  return (
    <main>
      <title>{config.title}</title>
      {config.jumbo ? (
        <Jumbo background={config.background}>{config.jumbo}</Jumbo>
      ) : (
        <Hero background={config.background}>
          <h1>{config.title}</h1>
        </Hero>
      )}
      {children}
    </main>
  );
};
