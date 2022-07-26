import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import "./hero.scss";

export const Hero: React.FC<{ background?: string; title: string }> = ({
  background,
  title,
  children,
}) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { glob: "backgrounds/*" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 350, backgroundColor: "#fff")
          }
        }
      }
    }
  `);

  const backgroundImage = useMemo(() => {
    return getSrc(allFile.nodes.find((node) => node.name === background));
  }, [allFile]);

  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {
        background: `linear-gradient(
          var(--tertiary-dark) 0%,
          var(--tertiary) 30%,
          var(--tertiary) 70%,
          var(--tertiary-dark) 100%
        )`,
      };
  return (
    <div className="hero" style={style}>
      <div className="hero-content">
        <Typography variant="h1" color="primary">
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
};
