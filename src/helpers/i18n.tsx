import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import { useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { MyLink } from "./links";

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
    <MyLink to={pathname.replace(/\/(fr|en)/, "")} style={{ width: "100%" }}>
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
    </MyLink>
  );
};
