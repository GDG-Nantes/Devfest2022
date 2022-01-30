import React from "react";
import { Hero } from "./hero/hero";
import { Jumbo } from "./jumbo/jumbo";

export type PageConfig = {
  title: string;
  description?: string;
  background?: string;
  jumbo?: React.FC;
};

export const DefaultPage: React.FC<PageConfig> = ({
  children,
  title,
  jumbo: JumboContent,
  background,
}) => {
  return (
    <main>
      <title>{title}</title>
      {JumboContent ? (
        <Jumbo background={background}>
          <JumboContent />
        </Jumbo>
      ) : (
        <Hero background={background} title={title} />
      )}
      {children}
    </main>
  );
};
