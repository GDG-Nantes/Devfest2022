import React from "react";
import { useTranslation } from "react-i18next";
import { Blogs } from "../components/blog/blog";
import { DefaultPage } from "../components/commun/page";
import { TertiarySection } from "../components/commun/section/section";
import Layout from "../layout";

const BlogsPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.blog" });
  return (
    <Layout>
      <DefaultPage title={t("name")} noHero>
        <TertiarySection>
          <Blogs />
        </TertiarySection>
      </DefaultPage>
    </Layout>
  );
};

export default BlogsPage;
