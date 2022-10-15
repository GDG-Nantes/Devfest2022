import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export const PlanCite = () => {
  const { file } = useStaticQuery(graphql`
    query {
      file(name: { eq: "plan-cite-transparent" }) {
        childImageSharp {
          gatsbyImageData(backgroundColor: "#fff")
        }
      }
    }
  `);

  return (
    <GatsbyImage
      image={getImage(file) as IGatsbyImageData}
      alt="Plan Cité des Congrès"
      objectFit="contain"
      backgroundColor="var(--tertiary)"
      style={{ maxHeight: "500px" }}
    />
  );
};
