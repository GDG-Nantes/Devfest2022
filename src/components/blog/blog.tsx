import { Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { Blog } from "../../../json_schemas/interfaces/schema_blog";
import { MyLink } from "../../helpers/links";
import { useResponsiveData } from "../../helpers/responsive";

export const Blogs: React.FC = () => {
  const { allBlogsYaml, allFile } = useStaticQuery(graphql`
    query {
      allBlogsYaml {
        edges {
          node {
            key
            title
            image
            date(formatString: "YYYY-MM-DD")
            content
          }
        }
      }
      allFile(filter: { relativePath: { glob: "blog/**/mini-*" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `);

  const blogs = allBlogsYaml.edges.map((e) => {
    return {
      ...e.node,
      imageData: getImage(
        allFile.nodes.find((node) => node.name == "mini-" + e.node.image)
      ),
    };
  }) as Array<Blog & { imageData: IGatsbyImageData }>;

  return (
    <Stack spacing={5} divider={<Divider />}>
      {blogs
        .filter((blog) => format(Date.now(), "yyyy-MM-dd") >= blog.date)
        .sort((b1, b2) => b2.date.localeCompare(b1.date))
        .map((blog, i) => (
          <ArticleBlog key={blog.key} blog={blog} i={i} />
        ))}
    </Stack>
  );
};

const ArticleBlog: React.FC<{
  blog: Blog & { imageData: IGatsbyImageData };
  i: number;
}> = ({ blog, i }) => {
  const { isBig } = useResponsiveData();
  return (
    <MyLink key={blog.key} to={"/blog/" + blog.key}>
      <article className="lien-blog">
        <Stack
          direction={i % 2 == 0 ? "row" : "row-reverse"}
          spacing={2}
          maxHeight={200}
          overflow="hidden"
        >
          {isBig && (
            <div
              style={{
                minWidth: "25%",
                display: "flex",
                justifyContent: i % 2 == 0 ? "flex-start" : "flex-end",
              }}
            >
              <GatsbyImage
                image={blog.imageData}
                alt={"image " + blog.title}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
          )}
          <Stack direction="column" style={{ minWidth: "calc(75% - 16px)" }}>
            <Typography variant="h2">{blog.title}</Typography>
            <Typography
              variant="subtitle2"
              style={{ marginTop: "-35px", marginBottom: "20px" }}
            >
              {blog.date}
            </Typography>
            {/* <Markdown
              content={mettreEnForme(blog.content)}
              className="two-line-text"
            /> */}
            <Typography variant="body1" className="two-line-text">
              {mettreEnForme(blog.content)}
            </Typography>
          </Stack>
        </Stack>
      </article>
    </MyLink>
  );
};

function mettreEnForme(content) {
  return content
    .replace(/^#+/g, "")
    .replace(/__(.+)__/g, "$1")
    .replace(/!?\[.*\]\(.+\)/g, "")
    .replace(/<.+>/g, "");
}
