import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

type PropsImage = {
  name: string;
  width?: number;
  alt: string;
};
const Image: React.FC<PropsImage> = ({ alt, name, width }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(width: 200)
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) => {
        return n.node.relativePath.includes(name);
      });
      console.log(data.images);
      console.log(image);
      if (!image) {
        return null;
      }

      const imageData = getImage(image);
      console.log(imageData);
      return <GatsbyImage alt={alt} image={imageData} />;
    }}
  />
);

export default Image;
