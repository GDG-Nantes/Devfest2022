import React from "react";
import { Hero } from "./hero/hero";
import { Jumbo } from "./jumbo/jumbo";

export type PageConfig = {
  title: string;
  description?: string;
  background?: string;
  jumbo?: React.FC;
  noHero?: boolean;
};

export const DefaultPage: React.FC<PageConfig> = ({
  children,
  title,
  jumbo: JumboContent,
  background,
  noHero,
}) => {
  return (
    <main>
      <title>{title}</title>
      {JumboContent ? (
        <Jumbo background={background}>
          <JumboContent />
        </Jumbo>
      ) : (
        !noHero && <Hero background={background} title={title} />
      )}

      {children}
    </main>
  );
};
