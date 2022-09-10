import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { MenuTraiteur } from "../components/menu-traiteur";
import Layout from "../layout";

const PartnersPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.menu" });
  return (
    <Layout>
      <DefaultPage title={t("name")} background="back-5">
        <MenuTraiteur />
      </DefaultPage>
    </Layout>
  );
};

export default PartnersPage;
