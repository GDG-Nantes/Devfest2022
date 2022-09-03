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
      onClick={() => setForcedLanguage(targetLanguage)}
    >
      <Flag lang={targetLanguage} />
    </LocalizedLink>
  );
};

export function setForcedLanguage(targetLanguage: "fr" | "en") {
  localStorage.setItem("forcedLanguage", targetLanguage);
}

export function getForcedLanguage(): string | null {
  return localStorage.getItem("forcedLanguage");
}
