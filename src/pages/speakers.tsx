import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { PrimarySection } from "../components/commun/section/section";
import { Speakers } from "../components/speakers/speakers";
import Layout from "../layout";

const SpeakersPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.speakers" });
  return (
    <Layout>
      <DefaultPage title={t("name")} background="back-5">
        <PrimarySection>
          <Speakers />
        </PrimarySection>
      </DefaultPage>
    </Layout>
  );
};

export default SpeakersPage;
