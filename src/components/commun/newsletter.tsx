import { Send } from "@mui/icons-material";
import { Button } from "gatsby-theme-material-ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";

export const SubscribeNewsletter = () => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" });

  return (
    <MyLink to="https://gdgnantes.us9.list-manage.com/subscribe/post?u=b44affc3cdfd00b20bcae502c&amp;amp;id=e0e7ceee5d">
      <Button variant="contained" aria-label="newsletter">
        <Send style={{ marginRight: "20px" }} /> {t("news-button")}
      </Button>
    </MyLink>
  );
};
