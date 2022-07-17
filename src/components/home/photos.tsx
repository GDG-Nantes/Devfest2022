import { Button, Stack } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";
import { useResponsiveData } from "../../helpers/responsive";
import { SecondarySection } from "../commun/section/section";

export const DevfestPhotos = () => (
  <SecondarySection padding="none">
    <Album />
  </SecondarySection>
);

const Album = () => {
  const { isMobileOrTablet } = useResponsiveData();
  const { highImages, squareImages, wideImages } = useStaticQuery(graphql`
    query {
      highImages: allFile(
        filter: { relativePath: { glob: "home/album/high/*" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 0.75
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
      squareImages: allFile(
        filter: { relativePath: { glob: "home/album/square/*" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
      wideImages: allFile(
        filter: { relativePath: { glob: "home/album/wide/*" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.2
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `);

  const imageByName = React.useCallback(
    (name: string): ImageDataLike & { name: string } => {
      return [
        ...highImages.nodes,
        ...squareImages.nodes,
        ...wideImages.nodes,
      ].find((node) => node.name === name);
    },
    [highImages, squareImages, wideImages]
  );

  return isMobileOrTablet ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(5, 17vh)",
        gridAutoFlow: "dense",
        gap: "5px",
      }}
    >
      <Picture
        image={imageByName("macarons")}
        gridColumn="1"
        gridRow="span 2"
      />
      <Picture image={imageByName("gdg")} gridColumn="span 2" />
      <Picture image={imageByName("buffet")} gridColumn="span 1" />
      <Picture
        image={imageByName("ange")}
        gridColumn="span 1"
        gridRow="span 2"
      />
      <Picture image={imageByName("amphi")} gridColumn="span 2" />
      <Picture image={imageByName("conf")} gridColumn="span 1" />
      <Picture image={imageByName("qpuc_close")} gridColumn="span 1" />
      <Picture image={imageByName("wescale")} gridColumn="span 1" />
      <ButtonTile gridColumn="span 3" />
    </div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(3, 30vh)",
        gridAutoFlow: "dense",
        gap: "5px",
      }}
    >
      <Picture
        image={imageByName("macarons")}
        gridColumn="1"
        gridRow="span 2"
      />
      <Picture image={imageByName("gdg")} gridColumn="span 2" />
      <Picture image={imageByName("amphi")} gridColumn="span 2" />
      <ButtonTile gridColumn="span 2" />
      <Picture image={imageByName("buffet")} gridColumn="span 1" />
      <Picture
        image={imageByName("ange")}
        gridColumn="span 1"
        gridRow="span 2"
      />
      <Picture image={imageByName("conf")} gridColumn="span 2" />
      <Picture image={imageByName("qpuc_close")} gridColumn="span 1" />
      <Picture image={imageByName("wescale")} gridColumn="span 1" />
    </div>
  );
};

const ButtonTile = ({ gridColumn }: { gridColumn: string }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.photos",
  });
  return (
    <Stack style={{ gridColumn }} alignItems="center" justifyContent="center">
      <p>{t("p1")}</p>
      <p style={{ marginTop: 0 }}>{t("p2")}</p>
      <MyLink to="https://photos.app.goo.gl/bEa1r4VVb5GLS4A77">
        <Button variant="contained" color="primary" aria-label="Photos 2021">
          {t("button")}
        </Button>
      </MyLink>
    </Stack>
  );
};

const Picture: React.FC<{
  image: ImageDataLike & { name: string };
  gridColumn?: string;
  gridRow?: string;
}> = ({ image, gridColumn, gridRow }) => {
  return (
    <div style={{ gridColumn, gridRow }}>
      <GatsbyImage
        alt={image.name}
        image={getImage(image)}
        objectPosition="center"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};
