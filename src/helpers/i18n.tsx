import { useLocation } from "@reach/router";
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { Flag } from "../components/commun/flags";

export const ToggleLanguage: React.FC = () => {
  const { locale } = useLocalization();
  const { pathname } = useLocation();

  const targetLanguage = locale === "fr" ? "en" : "fr";
  return (
    <LocalizedLink
      language={targetLanguage}
      to={pathname.replace(/\/(fr|en)/, "")}
      style={{ width: "100%" }}
    >
      <Flag lang={targetLanguage} />
    </LocalizedLink>
  );
};
