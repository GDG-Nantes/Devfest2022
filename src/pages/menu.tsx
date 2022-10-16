import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { MenuTraiteur } from "../components/menu-traiteur";
import Layout from "../layout";

const MenuTraiteurPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.menu" });
  return (
    <Layout>
      <DefaultPage title={t("name")} noHero>
        <MenuTraiteur />
      </DefaultPage>
    </Layout>
  );
};

export default MenuTraiteurPage;
