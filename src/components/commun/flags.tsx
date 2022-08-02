import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export const Flag: React.FC<{ lang: "English" | "French" | "fr" | "en" }> = ({
  lang,
}) => {
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
  const flag = flags.allFile.nodes.find((node) =>
    lang.toLowerCase().startsWith(node.name)
  );

  return (
    <img
      alt="logo"
      src={flag.publicURL}
      style={{
        height: "18px",
        width: "24px",
        objectFit: "cover",
        verticalAlign: "middle",
      }}
    />
  );
};
