import { graphql } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";

export const queryImageByWidth = graphql`
  fragment imageDataByWidth on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: $width)
        }
      }
    }
  }
`;

export const queryImageByHeight = graphql`
  fragment imageDataByHeight on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(height: $height)
        }
      }
    }
  }
`;

export const queryImage = graphql`
  fragment imageData on Query {
    images: allFile(filter: { relativePath: { glob: $pathGlob } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            width: $width
            height: $height
            backgroundColor: "#fff"
          )
        }
      }
    }
  }
`;

export type ImageData = {
  images: {
    nodes: Array<
      ImageDataLike & {
        name: string;
      }
    >;
  };
};

export function getImageData(imageData: ImageData, name?: string) {
  return getImage(
    imageData.images.nodes.find((node) => !name || node.name === name)
  );
}
