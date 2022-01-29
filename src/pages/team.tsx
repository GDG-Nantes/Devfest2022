import { Typography } from "@mui/material";
import * as React from "react";
import { DefaultPage } from "../components/commun/page";
import { DefaultSection } from "../components/commun/section/section";
import "../components/team/team.scss";
import { TeamMembers } from "../components/team/teamMembers";

const IndexPage = () => (
  <DefaultPage title="Team" background={"back-4.jpg"}>
    <DefaultSection variant="secondary">
      <Typography variant="h2">
        DevFest Nantes is supported by GDG Nantes.
      </Typography>
      <Typography>Blabla</Typography>
    </DefaultSection>
    <DefaultSection>
      <Typography variant="h2">Core Team</Typography>
      <TeamMembers />
    </DefaultSection>
  </DefaultPage>
);

export default IndexPage;
