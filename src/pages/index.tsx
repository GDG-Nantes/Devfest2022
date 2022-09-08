import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { slots } from "../../data/slots.json";
import { Session } from "../../json_schemas/interfaces/schema_sessions";
import { Flag } from "../components/commun/flags";
import { PrimarySection } from "../components/commun/section/section";
import { rooms } from "../components/schedule/common";
import "../layout";

const DataPage = () => {
  const { allSessionsYaml, allSpeakersYaml } = useStaticQuery(graphql`
    query {
      allSessionsYaml {
        edges {
          node {
            key
            room
            slot
            title
            language
            tags
            speakers
            talkType
          }
        }
      }
      allSpeakersYaml {
        edges {
          node {
            key
            name
          }
        }
      }
    }
  `);

  type SessionComplete = Session & { hour: string; speakersNames: string[] };
  const talksByDay: Array<Array<SessionComplete>> = [[], []];
  allSessionsYaml.edges.forEach((e) => {
    const session = e.node as SessionComplete;
    session.speakersNames = session.speakers.map(
      (s) => allSpeakersYaml.edges.find((es) => es.node.key === s)?.node?.name
    );
    const day = session.slot.startsWith("day-1") ? 0 : 1;
    session.hour = slots.find((s) => s.key === session.slot)?.start as string;
    talksByDay[day].push(session);
  });

  const copy = (x) => navigator.clipboard.writeText(x);
  return (
    <PrimarySection>
      {talksByDay.map((tbd, i) => (
        <>
          <Typography variant="h1">{i == 0 ? "Jeudi" : "Vendredi"}</Typography>
          {rooms.map((room) => (
            <>
              <br />
              <br />
              <Typography variant="h2" style={{ color: "var(--primary-dark)" }}>
                {room}
              </Typography>
              {tbd
                .filter((s) => s.room === room)
                .sort((s1, s2) => s1.hour?.localeCompare(s2.hour))
                .map((session) => (
                  <div key={session.key}>
                    <br />
                    <br />
                    <br />
                    <Typography
                      style={{ cursor: "pointer" }}
                      onClick={() => copy(session.title)}
                      variant="h3"
                    >
                      {session.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ color: "var(--primary-dark)" }}
                    >{`${session.talkType} - ${session.tags[0]} - ${session.hour}`}</Typography>
                    <Flag lang={session.language} size="small" />
                    {session.speakersNames.map((s) => (
                      <p
                        key={s}
                        style={{ cursor: "pointer" }}
                        onClick={() => copy(s)}
                      >
                        {s}
                      </p>
                    ))}
                  </div>
                ))}
            </>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      ))}
    </PrimarySection>
  );
};

export default DataPage;
