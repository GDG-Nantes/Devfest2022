import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";

export const HomeJumbo = () => {
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

      <Typography variant="subtitle1" textAlign="center" color="var(--primary-dark)">
        Plonge dans l'univers de Jules Verne !
      </Typography>

    </>
  );
};
