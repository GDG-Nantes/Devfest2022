import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export const Flag: React.FC<{
  lang: "English" | "French" | "fr" | "en";
  size?: "medium" | "small" | "tiny";
}> = ({ lang, size = "medium" }) => {
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

  const sizes =
    size == "medium"
      ? { height: "18px", width: "24px" }
      : size == "tiny"
      ? { height: "12px", width: "16px" }
      : { height: "14px", width: "19px" };

  return (
    <img
      alt="logo"
      src={flag.publicURL}
      style={{
        ...sizes,
        objectFit: "cover",
        verticalAlign: "middle",
      }}
    />
  );
};
