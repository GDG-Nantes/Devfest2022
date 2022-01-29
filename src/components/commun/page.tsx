import { Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { Hero } from "./hero/hero";
import { Jumbo } from "./jumbo/jumbo";

export type PageConfig = {
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
        <Jumbo background={config.background}>
          <Typography variant="h1">{config.jumbo}</Typography>
        </Jumbo>
      ) : (
        <Hero background={config.background} title={config.title} />
      )}
      {children}
    </main>
  );
};
