import { graphql } from "gatsby";

export const queryImageByWidth = graphql`
  fragment imageDataByWidth on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: $width)
          }
        }
      }
    }
  }
`;

export const queryImageByHeight = graphql`
  fragment imageDataByHeight on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(height: $height)
          }
        }
      }
    }
  }
`;

export const queryImage = graphql`
  fragment imageData on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: $width, height: $height)
          }
        }
      }
    }
  }
`;

export type ImageData = {
  images: {
    edges: Array<{
      node: {
        name: string;
        childImageSharp: {
          gatsbyImageData;
        };
      };
    }>;
  };
};

export function getImageData(imageData: ImageData, name?: string) {
  return imageData.images.edges.find((edge) => !name || edge.node.name === name)
    .node.childImageSharp.gatsbyImageData;
}
