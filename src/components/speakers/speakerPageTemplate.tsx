import { Card, Stack, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Session } from "../../../json_schemas/interfaces/schema_sessions";
import {
  Social,
  Speaker,
} from "../../../json_schemas/interfaces/schema_speakers";
import { MyLink } from "../../helpers/links";
import Layout from "../../layout";
import { Markdown } from "../commun/markdown";
import { DefaultPage } from "../commun/page";
import { SecondarySection, TertiarySection } from "../commun/section/section";
import { SocialLink } from "../commun/socials/socials";
import { AvatarSpeaker, Tags } from "../schedule/common";

export type PartialSession = Pick<
  Session,
  "key" | "title" | "tags" | "speakers"
>;
const SpeakerPageTemplate: React.FC<{ pageContext: { speaker: Speaker } }> = ({
  pageContext: { speaker },
}) => {
  const { allSessionsYaml } = useStaticQuery(graphql`
    query {
      allSessionsYaml {
        edges {
          node {
            key
            title
            tags
            speakers
          }
        }
      }
    }
  `);

  const sessions: PartialSession[] = allSessionsYaml.edges
    .filter((edge) => edge.node.speakers.includes(speaker.key))
    .map((e) => e.node);

  return (
    <Layout>
      <DefaultPage title={speaker.name} noHero={true}>
        <TertiarySection>
          <Stack spacing={5}>
            <Stack spacing={5} direction="column" alignItems="center">
              <AvatarSpeaker speaker={speaker} size="large" />
              <Typography
                variant="h1"
                color="primary"
                sx={{ marginBottom: "5px" }}
              >
                {speaker.name}
              </Typography>
              {speaker.company && (
                <Typography
                  variant="h4"
                  style={{ color: "var(--primary)", marginTop: "20px" }}
                >
                  {speaker.company}
                </Typography>
              )}
              <Stack direction="row" spacing={2}>
                {Object.entries(speaker.socials || {}).map(([media, login]) => (
                  <SocialLink
                    key={media}
                    login={login}
                    type={media as keyof Social}
                    withLogin
                  />
                ))}
              </Stack>
            </Stack>
            <Stack spacing={1}>
              {sessions.map((session) => (
                <SessionCard key={session.key} session={session} />
              ))}
            </Stack>
          </Stack>
        </TertiarySection>
        <SecondarySection>
          <Markdown content={speaker.bio} />
        </SecondarySection>
      </DefaultPage>
    </Layout>
  );
};

const SessionCard: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <MyLink to={"/sessions/" + session.key}>
      <Card
        sx={{
          maxWidth: "90%",
          minHeight: "60px",
          color: "var(--tertiary)",
          backgroundColor: "var(--primary)",
          padding: "10px",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ minHeight: "60px" }}
        >
          <Tags tags={session.tags} color="default" />
          <Typography variant="h3" color="inherit" style={{ color: "white" }}>
            {session.title}
          </Typography>
        </Stack>
      </Card>
    </MyLink>
  );
};

export default SpeakerPageTemplate;
