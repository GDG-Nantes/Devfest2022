import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { Partners } from "../components/partners";
import Layout from "../layout";

const PartnersPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.partners" });
  return (
    <Layout>
      <DefaultPage title={t("name")} background="back-5">
        <Partners />
      </DefaultPage>
    </Layout>
  );
};

export default PartnersPage;
