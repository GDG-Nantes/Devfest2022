import { Avatar, Chip, Tooltip } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import {
  Rooms,
  Session,
} from "../../../json_schemas/interfaces/schema_sessions";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { Speaker } from "../../../json_schemas/interfaces/schema_speakers";
import { MyLink } from "../../helpers/links";
import "./schedule.scss";

export type PartialSession = Omit<Session, "abstract"> & { slot: Slot };
export type PartialSpeaker = Pick<Speaker, "key" | "name" | "photoUrl">;

export const rooms: Rooms[] = [
  "Jules Verne",
  "Titan",
  "Bellem",
  "Tour de Bretagne",
  "Les Machines",
  "Hangar",
  "L'Atelier",
];
const tagLabels = {
  mobile_iot: "📱 Mobile & IoT",
  web: "🌍 Web",
  discovery: "💡 Discovery",
  cloud_devops: "☁️ Cloud & DevOps",
  languages: "📝 Languages",
  bigdata_ai: "🤖 BigData & AI",
  security: "🐱‍💻 SECURITY",
  ux_ui: "💚 UX / UI",
};
export const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tagLabels[tag]}
          variant="outlined"
          size="small"
        />
      ))}
    </div>
  );
};

export const Speakers: React.FC<{ speakers: string[] }> = ({ speakers }) => {
  const { allSpeakersYaml } = useStaticQuery(graphql`
    query {
      allSpeakersYaml {
        edges {
          node {
            key
            name
            photoUrl
          }
        }
      }
    }
  `);

  const speakersFull: PartialSpeaker[] = speakers.map(
    (key) => allSpeakersYaml.edges.find((edge) => edge.node.key === key).node
  );

  return (
    <div className="speakers">
      {speakers.length === 1 ? (
        <MyLink to={"/speakers/" + speakersFull[0].key}>
          <div className="speaker">
            <AvatarSpeaker speaker={speakersFull[0]} />
            {speakersFull[0].name}
          </div>
        </MyLink>
      ) : (
        <>
          {speakersFull.map((speaker) => (
            <MyLink to={"/speakers/" + speaker.key} key={speaker.key}>
              <div className="speaker">
                <AvatarSpeaker speaker={speaker} />
              </div>
            </MyLink>
          ))}
        </>
      )}
    </div>
  );
};

export const AvatarSpeaker: React.FC<{ speaker: PartialSpeaker }> = ({
  speaker,
}) => (
  <MyLink to={"/speakers/" + speaker.key}>
    <Tooltip title={speaker.name}>
      <Avatar
        alt={speaker.name}
        src={speaker.photoUrl}
        sx={{ width: "24px", height: "24px", margin: "4px 4px" }}
      />
    </Tooltip>
  </MyLink>
);
