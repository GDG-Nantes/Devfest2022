import { Button, Stack } from "@mui/material";
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
        <PrimarySection slim>
          <Stack
            direction="row"
            spacing="20px"
            width="100%"
            justifyContent="center"
          >
            <MyLink to="/schedule/1">
              <Button variant="text" color="inherit">
                {t("day1")}
              </Button>
            </MyLink>
            <MyLink to="/schedule/2">
              <Button variant="text" color="inherit">
                {t("day2")}
              </Button>
            </MyLink>
          </Stack>
        </PrimarySection>
        <SecondarySection padding="small">
          <Schedule day={day} />
        </SecondarySection>
      </DefaultPage>
    </Layout>
  );
};

export default SchedulePage;
