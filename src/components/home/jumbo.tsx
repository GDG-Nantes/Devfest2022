import { Campaign } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";
import "./home.scss";

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

      <Stack direction="row" spacing={3}>
        <MyLink to="https://conference-hall.io/public/event/CfucIjaXxrZThJE0POR3">
          <Button
            variant="contained"
            color="secondary"
            aria-label="Devenir speaker"
          >
            <IconButton aria-label="cfp">
              <Campaign />
            </IconButton>
            Devenir speaker
          </Button>
        </MyLink>
        <MyLink to="https://devfest2021.gdgnantes.com">
          <Button
            variant="outlined"
            color="secondary"
            aria-label="Edition 2021"
          >
            L'édition 2021
          </Button>
        </MyLink>
      </Stack>
    </>
  );
};
