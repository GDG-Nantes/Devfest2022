import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { MENU } from "../menu";

export const Helmet: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const helmet = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          image
        }
      }
    }
  `);

  const pageTitle = MENU.find(
    (menu) => pathname.replace(/\/(fr|en)/, "") === menu.link
  )?.label;
  const title = pageTitle ? t("pages." + pageTitle) : "Devfest Nantes";

  const socialImage =
    helmet.site.siteMetadata.siteUrl + helmet.site.siteMetadata.image;

  const description = t("site.description");

  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={helmet.site.siteMetadata.siteUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content={helmet.site.siteMetadata.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </ReactHelmet>
  );
};
