import { Button, Typography } from "@mui/material";
import { useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { MyLink } from "../helpers/links";
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
      <MyLink to="/">
        <Button variant="contained" color="secondary">
          {t("button")}
        </Button>
      </MyLink>
    </>
  );
};

export default ErrorPage;
