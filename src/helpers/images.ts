import { getImage, ImageDataLike } from "gatsby-plugin-image";

export type ImagesData = {
  images: {
    nodes: Array<
      ImageDataLike & {
        name: string;
      }
    >;
  };
};

export function getImagesData(imagesData: ImagesData, name?: string) {
  return getImage(
    imagesData.images.nodes.find((node) => !name || node.name === name)
  );
}
