import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../../components/commun/page";
import {
  PrimarySection,
  SecondarySection,
} from "../../components/commun/section/section";
import { Schedule } from "../../components/schedule";
import { MyLink } from "../../helpers/links";
import Layout from "../../layout";

export const SchedulePage: React.FC<{ day: 1 | 2 }> = ({ day = 1 }) => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.schedule" });

  return (
    <Layout>
      <DefaultPage title={t("name")} background="back-5">
        <PrimarySection>
          <MyLink to="/schedule/1">Jour 1</MyLink>
          <MyLink to="/schedule/2">Jour 2</MyLink>
        </PrimarySection>
        <SecondarySection>
          <Schedule day={day} />
        </SecondarySection>
      </DefaultPage>
    </Layout>
  );
};

export default SchedulePage;
