import { Grid, Typography } from "@mui/material";
import classNames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import partners from "../../../data/partners.json";
import { Partners as IPartners } from "../../../json_schemas/interfaces/schema_partners";
import { MyLink } from "../../helpers/links";
import { TertiarySection } from "../commun/section/section";
import "./style.scss";

const typedPartners = partners as IPartners;
/**
 * Composant d'affichage de la liste des logos des partenaires
 */
export const Partners: React.FC<{
  onlyPlatinium?: boolean;
}> = ({ onlyPlatinium }) => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.partners" });

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

  const partnersImages: {
    [k in keyof IPartners]: { [key: string]: IGatsbyImageData };
  } = useMemo(() => {
    const mapObj = {};
    Object.keys(typedPartners).forEach((category) => {
      mapObj[category] = {};
      typedPartners[category].forEach((partner) => {
        mapObj[category][partner.id] = getImage(
          allFile.nodes.find((node) => node.name === partner.id)
        );
      });
    });
    return mapObj;
  }, [allFile]);

  const types = useMemo(
    () => (onlyPlatinium ? ["platinium"] : Object.keys(typedPartners)),
    [typedPartners]
  );

  return (
    <>
      {types.map((typePartner) => {
        const sizes = {
          platinium: { height: "175px", width: "300px" },
          gold: { height: "120px", width: "200px" },
          virtual: { height: "120px", width: "200px" },
        };

        return (
          <TertiarySection key={typePartner}>
            <Typography
              variant="h2"
              align="center"
              fontSize="40px"
              style={{ marginBottom: "50px" }}
            >
              {onlyPlatinium ? t("platinium-partners") : typePartner}
            </Typography>
            <Grid
              className={classNames("partners", typePartner)}
              container
              columnSpacing={typePartner === "platinium" ? 6 : 5}
              rowSpacing={typePartner === "platinium" ? 8 : 6}
              justifyContent="center"
            >
              {typedPartners[typePartner].map((partner) => (
                <Grid
                  item
                  maxWidth={500}
                  key={partner.id}
                  sm={12}
                  md={6}
                  lg={4}
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    maxHeight: sizes[typePartner].height,
                    maxWidth: sizes[typePartner].width,
                  }}
                >
                  <MyLink to={partner.website || ""}>
                    <GatsbyImage
                      className="partner-logo"
                      objectFit="contain"
                      alt={partner.title}
                      image={partnersImages[typePartner][partner.id]}
                    />
                  </MyLink>
                </Grid>
              ))}
            </Grid>
          </TertiarySection>
        );
      })}
    </>
  );
};
