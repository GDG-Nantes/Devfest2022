import React from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>{title}</title>
      </Helmet>
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
