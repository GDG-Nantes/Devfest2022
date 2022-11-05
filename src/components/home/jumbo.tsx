import { PhotoCamera, YouTube } from "@mui/icons-material";
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
        {/* <MyLink to="https://openfeedback.io/devfestnantes22">
          <Button
            variant="contained"
            color="secondary"
            aria-label="OpenFeedback"
          >
            <IconButton>
              <AddComment />
            </IconButton>
            Openfeedback
          </Button>
        </MyLink> */}
        <MyLink to="https://photos.app.goo.gl/zGn6FXECdRXH9D4f8">
          <Button variant="contained" color="secondary" aria-label="Photos">
            <IconButton>
              <PhotoCamera />
            </IconButton>
            Photos
          </Button>
        </MyLink>
        <MyLink to="https://www.youtube.com/watch?v=rQaEzZIZIRg&list=PLuZ_sYdawLiWIRK-QW6zpEJMSeCtspXP8">
          <Button variant="contained" color="secondary" aria-label="Youtube">
            <IconButton>
              <YouTube />
            </IconButton>
            Youtube
          </Button>
        </MyLink>
      </Stack>
    </>
  );
};
