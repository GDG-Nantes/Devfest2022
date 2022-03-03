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
      file(name: { eq: "logo_extraordinaire_bleu" }) {
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
        height="300"
        width="500"
      />

      <Typography variant="h1" textAlign="center" color="var(--primary-dark)">
        {t("date")}
      </Typography>

      <Stack direction="row" spacing={3}>
        <MyLink to="https://devfest2021.gdgnantes.com">
          <Button
            variant="outlined"
            color="secondary"
            style={{ textAlign: "center" }}
            aria-label="Edition 2021"
          >
            L'édition 2021
          </Button>
        </MyLink>
      </Stack>
    </>
  );
};
