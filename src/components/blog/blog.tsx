import { Divider, Stack, Typography } from "@mui/material";
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
            id
            title
            image
            date
            content
          }
        }
      }
      allFile(
        filter: { relativePath: { glob: "blog/**/*" }, ext: { ne: ".mdx" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 200
              height: 200
              backgroundColor: "#fff"
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `);

  const { isBig } = useResponsiveData();

  const blogs = allBlogsYaml.edges.map((e) => {
    return {
      ...e.node,
      imageData: getImage(
        allFile.nodes.find((node) => node.name == e.node.image)
      ),
    };
  }) as Array<Blog & { imageData: IGatsbyImageData }>;

  return (
    <Stack spacing={5} divider={<Divider />}>
      {blogs.map((blog, i) => (
        <MyLink key={blog.id} to={"/blog/" + blog.id}>
          <article className="lien-blog">
            <Stack
              direction={i % 2 == 0 ? "row" : "row-reverse"}
              spacing={5}
              maxHeight={200}
              overflow="hidden"
            >
              {isBig && (
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    justifyContent: "center",
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
              <Stack direction="column" style={{ maxWidth: "75%" }}>
                <Typography variant="h2">{blog.title}</Typography>
                <Typography variant="body1" textOverflow="ellipsis">
                  {truncate(blog.content, 400)}
                </Typography>
              </Stack>
            </Stack>
          </article>
        </MyLink>
      ))}
    </Stack>
  );
};

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}
