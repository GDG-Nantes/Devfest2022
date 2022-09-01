import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Speaker } from "../../../json_schemas/interfaces/schema_speakers";
import { shuffleArray } from "../../helpers";
import { AvatarSpeaker } from "../schedule/common";
import "./style.scss";

export const Speakers: React.FC<{ featuredOnly?: boolean }> = ({
  featuredOnly,
}) => {
  const { allSpeakersYaml } = useStaticQuery(graphql`
    query {
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
            }
          }
        }
      }
    }
  `);

  const [shuffledSpeakers, setShuffledSpeakers] = React.useState<Speaker[]>(
    allSpeakersYaml.edges
      .map((e) => e.node)
      .filter((s) => !featuredOnly || s.feature)
  );

  React.useEffect(
    () =>
      setShuffledSpeakers(
        shuffleArray(shuffledSpeakers).sort((s1, s2) => (s1.feature ? -1 : 1))
      ),
    []
  );

  return (
    <Grid
      container
      columnSpacing={3}
      rowSpacing={6}
      justifyContent="center"
      className="speakers-list"
    >
      {shuffledSpeakers.map((speaker) => (
        <Grid
          item
          maxWidth={500}
          height="100%"
          width="100%"
          key={speaker.key}
          alignItems="center"
          justifyContent="center"
          sm={12}
          md={6}
          lg={3}
        >
          <SpeakerProfile speaker={speaker} />
        </Grid>
      ))}
    </Grid>
  );
};

export const SpeakerProfile: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  return (
    <Box className="speaker">
      <Stack spacing={1} direction="column" alignItems="center" width="100%">
        <AvatarSpeaker speaker={speaker} size="large" />
        <Stack direction="column" alignItems="center">
          <Typography variant="h3" color="primary" sx={{ marginBottom: "5px" }}>
            {speaker.name}
          </Typography>
          <Typography variant="h4">{speaker.company}</Typography>
          <Typography variant="h4">{speaker.city}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
