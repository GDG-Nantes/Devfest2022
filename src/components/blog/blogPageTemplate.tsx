import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React from "react";
import { Blog } from "../../../json_schemas/interfaces/schema_blog";
import Layout from "../../layout";
import { Markdown } from "../commun/markdown";
import { DefaultPage } from "../commun/page";
import { DefaultSection, TertiarySection } from "../commun/section/section";
import "./style.scss";

const BlogPageTemplate: React.FC<{ pageContext: { blog: Blog } }> = ({
  pageContext: { blog },
}) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { glob: "blog/**/hero-*" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `);

  const backgroundSrc = getSrc(
    allFile.nodes.find((node) => node.name == "hero-" + blog.image)
  );

  return (
    <Layout>
      <DefaultPage title={blog.title} noHero={true}>
        <TertiarySection
          padding="none"
          className="blog-section-header"
          style={{
            backgroundImage: `url(${backgroundSrc})`,
          }}
        >
          <Typography variant="h1" color="primary">
            {blog.title}
          </Typography>
        </TertiarySection>
        <DefaultSection variant="primary-dark" className="blog-section">
          <Markdown content={blog.content} />
        </DefaultSection>
      </DefaultPage>
    </Layout>
  );
};

export default BlogPageTemplate;
