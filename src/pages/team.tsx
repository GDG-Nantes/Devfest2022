import { List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import team from "../../data/team.json";
import { DefaultPage } from "../components/commun/page";
import { DefaultSection } from "../components/commun/section/section";
import { SocialLink } from "../components/commun/socials/socials";
import "../components/team/team.scss";

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

      <List className="team-members">
        {team.bureau.map((member) => (
          // create a component once types have been generated
          <ListItem>
            {/* <GatsbyImage
              src={`../images/team/${member.id}.jpg`}
              alt={member.id}
            /> */}
            <Box>
              <Typography variant="h6">
                {member.firstName} {member.lastName.toUpperCase()}
              </Typography>
              <Typography variant="subtitle2">{member.title}</Typography>
              <List>
                {Object.entries(member.socials).map(([media, login]) => (
                  <SocialLink login={login} type={media as any} />
                ))}
              </List>
            </Box>
          </ListItem>
        ))}
      </List>
    </DefaultSection>
  </DefaultPage>
);

export default IndexPage;
