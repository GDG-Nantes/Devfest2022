import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SubscribeNewsletter } from "../components/commun/newsletter";
import { DefaultPage } from "../components/commun/page";
import {
  DefaultSection,
  PrimarySection,
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
import { PlanCite } from "../components/home/plan";
import { Tickets } from "../components/home/tickets";
import { Partners } from "../components/partners";
import { Speakers } from "../components/speakers/speakers";
import { MyLink } from "../helpers/links";
import Layout from "../layout";

const HomeContent = () => {
  const { t } = useTranslation("translation");
  return (
    <>
      <SecondarySection>
        <Typography variant="h1">{t("pages.home.what-is")}</Typography>
        <Typography variant="body1">{t("site.description")}</Typography>
        <Typography variant="body1">{t("site.theme")}</Typography>
        <DevfestNumbers />
        <Youtube id="rQaEzZIZIRg" title="Teaser 2022" />
      </SecondarySection>
      <PlanCite />
      <HomeMap />
      <DefaultSection variant="primary-dark" className="home-speakers">
        <Typography variant="h2">{t("pages.home.speakers.title")}</Typography>
        <Speakers featuredOnly={true} />
        <Stack justifyContent="center" alignItems="center" marginTop={8}>
          <MyLink to="/speakers">
            <Button variant="contained">
              {t("pages.home.speakers.seeAll")}
            </Button>
          </MyLink>
        </Stack>
      </DefaultSection>
      <PrimarySection>
        <Typography variant="h2">{t("pages.home.tickets.name")}</Typography>
        <Typography variant="h3">
          {t("pages.home.tickets.description")}
        </Typography>
        <Tickets />
      </PrimarySection>
      <TertiarySection slim>
        <Typography variant="h2">{t("pages.home.newsletter")}</Typography>
        <SubscribeNewsletter />
      </TertiarySection>
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
