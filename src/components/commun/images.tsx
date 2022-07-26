import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export const CompanyLogo: React.FC<{ logo?: string; company?: string }> = ({
  logo,
  company,
}) => {
  if (logo == null || company == null) {
    return null;
  }

  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativePath: { glob: "partners/**/*" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              backgroundColor: "transparent"
              transformOptions: { fit: INSIDE }
            )
          }
        }
      }
    }
  `);

  const companyLogo: IGatsbyImageData = allFile.nodes.find(
    (node) => node.name === logo
  );

  return (
    <GatsbyImage
      className="partner-logo"
      objectFit="contain"
      alt={company}
      image={companyLogo}
    />
  );
};
