import React from "react";
import { Speaker } from "../../json_schemas/interfaces/schema_speakers";
import Layout from "../layout";
import { DefaultPage } from "./commun/page";
import { PrimarySection } from "./commun/section/section";

const SpeakerPageTemplate: React.FC<{ pageContext: { speaker: Speaker } }> = ({
  pageContext: { speaker },
}) => {
  return (
    <Layout>
      <DefaultPage title={speaker.name}>
        <PrimarySection>{speaker.bio}</PrimarySection>
      </DefaultPage>
    </Layout>
  );
};

export default SpeakerPageTemplate;
