import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { DefaultPage } from "../../components/commun/page";
import { DefaultSection } from "../../components/commun/section/section";
import { Schedule } from "../../components/schedule";
import { MyLink } from "../../helpers/links";
import Layout from "../../layout";

export const SchedulePage: React.FC<{ day: 1 | 2 }> = ({ day = 1 }) => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.schedule" });

  return (
    <Layout>
      <DefaultPage title={t("name")}>
        <DefaultSection slim variant="primary-dark">
          <Stack
            className="header-days"
            direction="row"
            spacing="20px"
            width="100%"
            justifyContent="center"
          >
            <MyLink to="/schedule/1">
              <Button
                variant="contained"
                color="primary"
                className={classNames(
                  "button-schedule",
                  "day1",
                  day == 1 && "current"
                )}
              >
                {t("day1-number")}
              </Button>
            </MyLink>
            <MyLink to="/schedule/2">
              <Button
                variant="contained"
                color="primary"
                className={classNames(
                  "button-schedule",
                  "day2",
                  day == 2 && "current"
                )}
              >
                {t("day2-number")}
              </Button>
            </MyLink>
          </Stack>
          <Schedule day={day} />
        </DefaultSection>
        {/* <SecondarySection padding="small">
        </SecondarySection> */}
      </DefaultPage>
    </Layout>
  );
};

export default SchedulePage;
