import { Directions } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import { IconButton } from "gatsby-theme-material-ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";
import { useResponsiveData } from "../../helpers/responsive";
import { PrimarySection } from "../commun/section/section";

export const HomeMap = () => {
  const { isMobileOrTablet } = useResponsiveData();
  return isMobileOrTablet ? (
    <>
      {/* <FullWidthMap /> */}
      <PrimarySection slim>
        <Description />
      </PrimarySection>
    </>
  ) : (
    <FullWidthMap>
      <Box
        style={{
          position: "absolute",
          display: "inline-block",
          bottom: "20px",
          left: "20px",
          backgroundColor: "var(--primary)",
          color: "white",
          padding: "20px",
          maxWidth: "40vw",
        }}
      >
        <Description />
      </Box>
    </FullWidthMap>
  );
};

const Description = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.attending.map",
  });

  return (
    <>
      <Typography variant="h2" style={{ marginTop: 0 }}>
        {t("title")}
      </Typography>
      <Typography variant="h3">Cité des Congrès, Nantes, France</Typography>
      <p>{t("description")}</p>
      <MyLink to="https://www.google.com/maps/dir/?api=1&destination=47.2129658,-1.5425652">
        <Button variant="contained" color="secondary">
          5 rue de Valmy, 44000 Nantes
          <IconButton aria-label="directions">
            <Directions />
          </IconButton>
        </Button>
      </MyLink>
    </>
  );
};

const FullWidthMap: React.FC = ({ children }) => {
  const { isMobileOrTablet } = useResponsiveData();
  return (
    <div
      className="home-map"
      style={{
        height: isMobileOrTablet ? "300px" : "600px",
        width: "100%",
        position: "relative",
      }}
    >
      <StaticImage
        alt="world map"
        src="../../images/home/map.jpg"
        objectFit="cover"
        style={{ height: "100%", width: "100%" }}
        layout="fixed"
      />
      {children}
    </div>
  );
};
