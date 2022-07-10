import React from "react";
import { Session } from "../../json_schemas/interfaces/schema_sessions";
import { DefaultPage } from "../components/commun/page";
import Layout from "../layout";
import { PrimarySection } from "./commun/section/section";

const SessionPageTemplate: React.FC<{ pageContext: { session: Session } }> = ({
  pageContext: { session },
}) => {
  return (
    <Layout>
      <DefaultPage title={session.title}>
        <PrimarySection>{session.abstract}</PrimarySection>
      </DefaultPage>
    </Layout>
  );
};

export default SessionPageTemplate;
