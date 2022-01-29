import { Grid, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useMemo } from "react";
import { Member, Social } from "../../../json_schemas/interfaces/schema_team";
import { shuffleArray } from "../../helpers";
import { getImageData, ImageData } from "../../helpers/images";
import { SocialLink } from "../commun/socials/socials";

export const TeamMembers: React.FC<{ members: Member[] }> = ({ members }) => {
  // All team members pictures with the right size
  const imageQuery: ImageData = useStaticQuery(graphql`
    query Images(
      $width: Int = 100
      $height: Int = 100
      $pathGlob: String = "team/**/*"
    ) {
      ...imageData
    }
  `);

  const imageByMember = useMemo(() => {
    const mapObj = {};
    members.forEach(
      (member) => (mapObj[member.id] = getImageData(imageQuery, member.id))
    );
    return mapObj;
  }, [members, imageQuery]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {shuffleArray(members).map((member) => (
        <Grid item maxWidth={300} key={member.id}>
          <Box>
            <GatsbyImage alt={member.id} image={imageByMember[member.id]} />
            <Typography variant="h6">
              {member.firstName} {member.lastName.toUpperCase()}
            </Typography>
            <Typography variant="subtitle2">{member.title}</Typography>
            <List>
              {Object.entries(member.socials).map(([media, login]) => (
                <SocialLink
                  key={media}
                  login={login}
                  type={media as keyof Social}
                />
              ))}
            </List>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
