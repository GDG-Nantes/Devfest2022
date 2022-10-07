const locales = require("./locales/config.json").map((l) => l.code);
const path = require("path");

/** Removes the useless pages (ex: /en/team.fr/)
 *   Changes path for files with extensions: /fr/team.fr/ -> /fr/team/
 *   Duplicates the french pages to create entrypoints without explicit languages: https://github.com/gatsbyjs/themes/issues/124
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // /en/team.fr/ -> prefix: en; suffix: en
  const extensionMatch =
    /\/(?:(?<prefix>[a-z]{2})\/)?[^.]*(?:\.(?<suffix>[a-z]{2}))?\//.exec(
      page.path
    );

  if (extensionMatch) {
    let pathWithoutSuffix = page.path;
    if (
      extensionMatch.groups.suffix &&
      (extensionMatch.groups.prefix === extensionMatch.groups.suffix ||
        (!extensionMatch.groups.prefix &&
          extensionMatch.groups.suffix === "fr"))
    ) {
      pathWithoutSuffix = page.path
        .replace(`.${extensionMatch.groups.suffix}/`, "/")
        .replace("/index/", "/");
      createPage({
        ...page,
        path: pathWithoutSuffix,
      });
    }
    if (extensionMatch.groups.suffix) {
      deletePage(page);
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Query for markdown nodes to use in creating pages.
  const { data, errors } = await graphql(
    `
      {
        allSessionsYaml {
          edges {
            node {
              key
              slot
              speakers
              tags
              talkType
              title
              room
              language
              complexity
              abstract
              openfeedbackId
            }
          }
        }
        allSpeakersYaml {
          edges {
            node {
              key
              name
              feature
              city
              company
              companyLogo
              photoUrl
              bio
              socials {
                twitter
                github
                linkedin
              }
            }
          }
        }
        allBlogsYaml {
          edges {
            node {
              key
              title
              image
              date
              content
            }
          }
        }
      }
    `
  );
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Sessions
  const sessionPageTemplate = path.resolve(
    "src/components/session/sessionPageTemplate.tsx"
  );
  data.allSessionsYaml.edges.forEach(({ node: session }) => {
    const path = "sessions/" + session.key;
    createPage({
      path,
      component: sessionPageTemplate,
      context: {
        session,
      },
    });
  });

  // Speakers
  const speakerPageTemplate = path.resolve(
    "src/components/speakers/speakerPageTemplate.tsx"
  );
  data.allSpeakersYaml.edges.forEach(({ node: speaker }) => {
    const path = "speakers/" + speaker.key;
    createPage({
      path,
      component: speakerPageTemplate,
      context: {
        speaker,
      },
    });
  });

  // Blogs
  const blogPageTemplate = path.resolve(
    "src/components/blog/blogPageTemplate.tsx"
  );
  data.allBlogsYaml.edges.forEach(({ node: blog }) => {
    const path = "blog/" + blog.key;
    createPage({
      path,
      component: blogPageTemplate,
      context: {
        blog,
      },
    });
  });
};
