import { Send } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";
import { useResponsiveData } from "../../helpers/responsive";
import "./home.scss";

export const HomeJumbo = () => {
  const { isMobileOrTablet } = useResponsiveData();
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.jumbo",
  });
  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "logo_extraordinaire" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <img
        className="logo-jumbo-home"
        alt="logo"
        src={logo.file.publicURL}
        height="200px"
      />

      <Typography
        variant={isMobileOrTablet ? "h2" : "h1"}
        textAlign="center"
        color="var(--primary-dark)"
      >
        Le DevFest Nantes sera de retour le <br /> 21 et 22 Octobre 2022 !
      </Typography>
      <Typography
        variant={isMobileOrTablet ? "h3" : "h2"}
        textAlign="center"
        style={{ marginBottom: "20px" }}
        color="var(--primary-dark)"
      >
        L'ouverture du sponsoring se fera le 24 Février à 14h
      </Typography>

      <Stack direction="row" spacing={3}>
        <MyLink to="https://www.billetweb.fr/partenaire-devfest-nantes">
          <Button variant="contained" color="primary" startIcon={<Send />}>
            Devenir sponsor
          </Button>
        </MyLink>
        <MyLink to="https://devfest2021.gdgnantes.com">
          <Button
            variant="outlined"
            color="primary"
            style={{ textAlign: "center" }}
          >
            L'édition 2021
          </Button>
        </MyLink>
      </Stack>
    </>
  );
};