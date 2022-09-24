import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import React from "react";
import { Blog } from "../../../json_schemas/interfaces/schema_blog";
import Layout from "../../layout";
import { Markdown } from "../commun/markdown";
import { DefaultPage } from "../commun/page";
import { SecondarySection, TertiarySection } from "../commun/section/section";

const BlogPageTemplate: React.FC<{ pageContext: { blog: Blog } }> = ({
  pageContext: { blog },
}) => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativePath: { glob: "blog/**/*" }, ext: { ne: ".mdx" } }
      ) {
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
    allFile.nodes.find((node) => node.name == blog.image)
  );

  return (
    <Layout>
      <DefaultPage title={blog.title} noHero={true}>
        <TertiarySection
          padding="none"
          style={{
            backgroundImage: `url(${backgroundSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 40%",
            height: "300px",
            alignItems: "flex-end",
            display: "flex",
          }}
        >
          <Typography
            variant="h1"
            style={{ marginBottom: "5px" }}
            color="primary"
          >
            {blog.title}
          </Typography>
        </TertiarySection>
        <SecondarySection>
          <Markdown content={blog.content} />
        </SecondarySection>
      </DefaultPage>
    </Layout>
  );
};

export default BlogPageTemplate;
