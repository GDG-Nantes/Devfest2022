import { Grid, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import team from "../../../data/team.yml";
import { Member, Social } from "../../../json_schemas/interfaces/schema_team";
import { shuffleArray } from "../../helpers";
import { SocialLink } from "../commun/socials/socials";
import "./team.scss";

const members = shuffleArray(team.bureau) as Member[];

export const TeamMembers: React.FC = () => {
  // All team members pictures with the right size
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { glob: "team/**/*" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 200, height: 200, backgroundColor: "#fff")
          }
        }
      }
    }
  `);

  const imageByMember = useMemo(() => {
    const mapObj = {};
    members.forEach(
      (member) =>
        (mapObj[member.id] = getImage(
          allFile.nodes.find((node) => !member.id || node.name === member.id)
        ))
    );
    return mapObj;
  }, [allFile]);

  return (
    <Grid container columnSpacing={3} rowSpacing={10} justifyContent="center">
      {members.map((member) => (
        <Grid
          item
          maxWidth={500}
          height="100%"
          width="100%"
          key={member.id}
          sm={12}
          md={6}
          lg={4}
        >
          <Box className="team-member">
            <div
              className="team-member-picture"
              style={{
                backgroundImage: `url('${
                  imageByMember[member.id].images.fallback.src
                }')`,
              }}
            ></div>

            <div className="member-info">
              <Typography variant="h3">
                {member.firstName} {member.lastName.toUpperCase()}
              </Typography>
              <Typography variant="h4">{member.title}</Typography>
              <List>
                {Object.entries(member.socials).map(([media, login]) => (
                  <SocialLink
                    key={media}
                    login={login}
                    type={media as keyof Social}
                  />
                ))}
              </List>
            </div>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
