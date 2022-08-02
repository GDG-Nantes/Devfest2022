import { Card, Stack, Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { slots } from "../../../data/slots.json";
import { Session } from "../../../json_schemas/interfaces/schema_sessions";
import { Speaker } from "../../../json_schemas/interfaces/schema_speakers";
import { MyLink } from "../../helpers/links";
import Layout from "../../layout";
import { Flag } from "../commun/flags";
import { CompanyLogo } from "../commun/images";
import { Markdown } from "../commun/markdown";
import { DefaultPage } from "../commun/page";
import { PrimarySection, TertiarySection } from "../commun/section/section";
import { AvatarSpeaker, SessionComplexity, Tags } from "../schedule/common";

const SessionPageTemplate: React.FC<{ pageContext: { session: Session } }> = ({
  pageContext: { session },
}) => {
  const slotLabel = getSessionSlotLabel(session.slot);
  return (
    <Layout>
      <DefaultPage title={session.title} noHero={true}>
        <TertiarySection>
          <Typography variant="h1" color="primary">
            {session.title}
          </Typography>
          <Stack spacing={5}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Tags tags={session.tags} />
              <SessionComplexity complexity={session.complexity} />
              <Flag lang={session.language} />
            </Stack>
            <Typography variant="h3">{slotLabel}</Typography>
            <Stack spacing={1}>
              {session.speakers.map((speaker) => (
                <SpeakerCard key={speaker} speakerKey={speaker} />
              ))}
            </Stack>
          </Stack>
        </TertiarySection>
        <PrimarySection>
          <Markdown content={session.abstract} />
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
        sx={{
          maxWidth: "400px",
          padding: "5px",
          minHeight: "75px",
          color: "var(--primary)",
        }}
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

function getSessionSlotLabel(slotKey: string): string {
  const { t } = useTranslation("translation", { keyPrefix: "pages.schedule" });
  const slot = slots.find((s) => s.key == slotKey);
  const slotDay = slotKey.startsWith("day-1") ? t("day1") : t("day2");
  return `📅 ${slotDay} ${slot?.start}`;
}

export default SessionPageTemplate;
