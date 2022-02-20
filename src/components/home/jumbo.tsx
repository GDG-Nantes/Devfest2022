import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import "./home.scss";

export const HomeJumbo = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.jumbo",
  });
  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "devfest_color_text_white" }) {
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
        height="220px"
      />

      <Typography variant="h1" className="primary" textAlign="center">
        {t("date")}
      </Typography>
      <Typography variant="h3" className="primary">
        Cité des Congrès, Nantes, France
      </Typography>
    </>
  );
};
