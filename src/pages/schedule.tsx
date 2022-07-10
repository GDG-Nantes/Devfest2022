import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../components/commun/page";
import { Schedule } from "../components/schedule";
import Layout from "../layout";

const SchedulePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.schedule" });

  const [day, setDay] = React.useState("2022-10-20");
  return (
    <Layout>
      <DefaultPage title={t("name")} background="back-5">
        <Button onClick={() => setDay("2022-10-20")}>Jour 1</Button>
        <Button onClick={() => setDay("2022-10-21")}>Jour 2</Button>
        <Schedule day={day} />
      </DefaultPage>
    </Layout>
  );
};

export default SchedulePage;
