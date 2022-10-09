import React from "react";
import { DefaultPage } from "../components/commun/page";
import { TertiarySection } from "../components/commun/section/section";
import { JobsWidget } from "../components/jobs/jobsWidget";
import Layout from "../layout";

const JobsPage = () => {
  return (
    <Layout>
      <DefaultPage title="Jobs" noHero>
        <TertiarySection padding="small">
          <JobsWidget />
        </TertiarySection>
      </DefaultPage>
    </Layout>
  );
};

export default JobsPage;
