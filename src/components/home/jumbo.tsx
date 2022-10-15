import { ConfirmationNumber } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";

export const HomeJumbo = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.jumbo",
  });

  return (
    <>
      <img
        className="logo-jumbo-home"
        alt="logo"
        src="/images/logo_extraordinaire_bleu.svg"
        height="300"
        width="500"
      />

      <Typography variant="h1" textAlign="center" color="var(--primary-dark)">
        {t("date")}
      </Typography>

      <Typography
        variant="subtitle1"
        textAlign="center"
        color="var(--primary-dark)"
      >
        Plonge dans l&apos;univers de Jules Verne !
      </Typography>
      <Stack direction="row" spacing={3}>
        <MyLink to="https://www.billetweb.fr/devfest-Nantes">
          <Button
            variant="contained"
            color="secondary"
            aria-label={t("generate-ticket")}
          >
            <IconButton>
              <ConfirmationNumber />
            </IconButton>
            {t("generate-ticket")}
          </Button>
        </MyLink>
      </Stack>
    </>
  );
};
