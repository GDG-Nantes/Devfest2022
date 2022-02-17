import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyLinkProps } from "gatsby-link";
import { LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n";
import React from "react";

interface IMyLink<TState = any> extends React.FC<GatsbyLinkProps<TState>> {}

export const MyLink: IMyLink = ({ children, ...props }) => {
  const { locale } = useLocalization();
  return (
    <Link language={locale} {...(props as any)}>
      {children}
    </Link>
  );
};

export const ToggleLanguage: React.FC = () => {
  const { locale } = useLocalization();
  const { pathname } = useLocation();
  const flags = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { glob: "flags/*" } }) {
        nodes {
          name
          publicURL
        }
      }
    }
  `);

  const targetLanguage = locale === "fr" ? "en" : "fr";
  const flag = flags.allFile.nodes.find((node) => node.name === targetLanguage);
  return (
    <Link
      language={targetLanguage}
      to={pathname.replace(/\/(fr|en)/, "")}
      style={{ width: "100%" }}
    >
      <img
        className="logo-jumbo-home"
        alt="logo"
        src={flag.publicURL}
        style={{
          height: "18px",
          width: "24px",
          objectFit: "cover",
          verticalAlign: "baseline",
        }}
      />
    </Link>
  );
};
