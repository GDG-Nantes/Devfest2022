import { Button, Typography } from "@mui/material";
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import Layout from "../layout";

const ErrorPage = () => (
  <Layout>
    <DefaultPage title="404" background="back-neutre.jpg" jumbo={Jumbo404} />
  </Layout>
);

const Jumbo404 = () => {
  const { t } = useTranslation("translation", { keyPrefix: "404" });
  const { locale } = useLocalization();
  return (
    <>
      <Typography variant="h1" component="h1" textAlign="center">
        {t("main")}
      </Typography>
      <LocalizedLink language={locale} to="/">
        <Button variant="contained" color="secondary">
          {t("button")}
        </Button>
      </LocalizedLink>
    </>
  );
};

export default ErrorPage;
