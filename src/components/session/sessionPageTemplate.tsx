import { Card, Stack, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Session } from "../../../json_schemas/interfaces/schema_sessions";
import { Speaker } from "../../../json_schemas/interfaces/schema_speakers";
import { MyLink } from "../../helpers/links";
import Layout from "../../layout";
import { CompanyLogo } from "../commun/images";
import { DefaultPage } from "../commun/page";
import { PrimarySection, TertiarySection } from "../commun/section/section";
import { AvatarSpeaker, Tags } from "../schedule/common";

const SessionPageTemplate: React.FC<{ pageContext: { session: Session } }> = ({
  pageContext: { session },
}) => {
  return (
    <Layout>
      <DefaultPage title={session.title} noHero={true}>
        <TertiarySection>
          <Typography variant="h1" color="primary">
            {session.title}
          </Typography>
          <Stack spacing={5}>
            <Tags tags={session.tags} />
            <Stack spacing={1}>
              {session.speakers.map((speaker) => (
                <SpeakerCard key={speaker} speakerKey={speaker} />
              ))}
            </Stack>
          </Stack>
        </TertiarySection>
        <PrimarySection>
          <div>{session.abstract}</div>
        </PrimarySection>
      </DefaultPage>
    </Layout>
  );
};

export type PartialSpeaker = Omit<Speaker, "feature" | "socials" | "bio">;
const SpeakerCard: React.FC<{ speakerKey }> = ({ speakerKey }) => {
  const { allSpeakersYaml } = useStaticQuery(graphql`
    query {
      allSpeakersYaml {
        edges {
          node {
            key
            name
            photoUrl
            city
            company
            companyLogo
          }
        }
      }
    }
  `);

  const speaker: PartialSpeaker = allSpeakersYaml.edges.find(
    (edge) => edge.node.key === speakerKey
  ).node;

  return (
    <MyLink to={"/speakers/" + speaker.key}>
      <Card
        sx={{ maxWidth: "400px", minHeight: "75px", color: "var(--primary)" }}
      >
        <Stack
          direction="row"
          spacing={5}
          alignItems="center"
          sx={{ minHeight: "75px", paddingLeft: "10px" }}
        >
          <AvatarSpeaker speaker={speaker} size="medium" />
          <Stack direction="column" spacing={1} justifyContent="center">
            <Typography variant="h4">{speaker.name}</Typography>
            {speaker.city}
          </Stack>
          <CompanyLogo logo={speaker.companyLogo} company={speaker.company} />
        </Stack>
      </Card>
    </MyLink>
  );
};

export default SessionPageTemplate;
