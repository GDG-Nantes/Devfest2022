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

  const [currentDate, setCurrentDate] = React.useState<string | null>(null);
  React.useEffect(() => {
    setCurrentDate(new Date().toISOString());
    console.log();
  }, []);

  return (
    <Stack spacing={5} divider={<Divider />}>
      {blogs.map(
        (blog, i) =>
          (currentDate == null || currentDate > blog.date) && (
            <ArticleBlog key={blog.key} blog={blog} i={i} />
          )
      )}
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
            <Typography
              variant="subtitle2"
              style={{ marginTop: "-35px", marginBottom: "20px" }}
            >
              {blog.date}
            </Typography>
            <Typography variant="body1">
              {truncate(blog.content, 400)}
            </Typography>
          </Stack>
        </Stack>
      </article>
    </MyLink>
  );
};

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}
