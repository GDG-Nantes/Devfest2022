import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SubscribeNewsletter } from "../components/commun/newsletter";
import { DefaultPage } from "../components/commun/page";
import {
  SecondarySection,
  TertiarySection,
} from "../components/commun/section/section";
import { Youtube } from "../components/commun/youtube";
import {
  DevfestNumbers,
  DevfestPhotos,
  HomeJumbo,
  HomeMap,
} from "../components/home";
import { Partners } from "../components/partners";
import Layout from "../layout";

const HomeContent = () => {
  const { t } = useTranslation("translation");
  return (
    <>
      <SecondarySection>
        <Typography variant="h1">{t("pages.home.what-is")}</Typography>
        <Typography variant="body1">{t("site.description")}</Typography>
        <DevfestNumbers />
        <Youtube id="VyWwCNhqk1w" title="AfterMovie 2021" />
      </SecondarySection>
      <TertiarySection slim>
        <Typography variant="h2">{t("pages.home.newsletter")}</Typography>
        <SubscribeNewsletter />
      </TertiarySection>
      <HomeMap />
      <Partners onlyPlatinium={true} />

      <DevfestPhotos />
    </>
  );
};

const HomePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.home" });
  return (
    <Layout>
      <DefaultPage title={t("name")} jumbo={HomeJumbo}>
        <HomeContent />
      </DefaultPage>
    </Layout>
  );
};

export default HomePage;
