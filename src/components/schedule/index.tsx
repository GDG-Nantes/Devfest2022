import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { slots } from "../../../data/slots.json";
import {
  Rooms,
  Session,
} from "../../../json_schemas/interfaces/schema_sessions";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import "./schedule.scss";

const typedSlots = slots as Slot[];

export const Schedule: React.FC<{ day: 1 | 2 }> = ({ day }) => {
  const { allSessionsYaml } = useStaticQuery(graphql`
    query {
      allSessionsYaml {
        edges {
          node {
            key
            slot
            speakers
            tags
            talkType
            title
            room
            language
            complexity
          }
        }
      }
    }
  `);

  type PartialSession = Omit<Session, "abstract"> & { slot: Slot };

  const sessions: PartialSession[] = allSessionsYaml.edges
    .map((x) => x.node)
    .filter((s) => s.slot.startsWith("day-" + day))
    .map((s) => ({
      ...s,
      slot: typedSlots.find((slot) => s.slot === slot.key),
    }));
  console.log(sessions.filter((s) => s.slot == null));

  const rooms: Rooms[] = [
    "Jules Verne",
    "Titan",
    "Bellem",
    "Tour de Bretagne",
    "Les Machines",
    "Hangar",
    "L'Atelier",
  ];
  const sessionsByRoom: { [k in Rooms]: PartialSession[] } = {} as any;
  rooms.forEach((room) => {
    sessionsByRoom[room] = sessions.filter((s) => s.room === room);
  });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${rooms.length + 1}, 1fr)`,
    gridAutoRows: "minmax(100px, auto)",
    gridGap: "1rem",
    width: "100%",
  };

  const allHoursSlots: Slot[] = typedSlots //
    .filter((s) => s.key.startsWith("day-" + day)) //
    .filter((s) => s.type !== "codelab");
  const fixedSlots: Slot[] = allHoursSlots.filter((s) =>
    ["opening", "lunch", "break", "keynote", "party"].includes(s.type)
  );

  return (
    <div style={gridStyle}>
      {allHoursSlots.map((slot) => {
        return (
          <div
            key={slot.key}
            className="slot"
            style={{
              gridColumn: "1 / 1",
              gridRow: slotToRow(slot as Slot),
            }}
          >
            {slot.start}
          </div>
        );
      })}
      {fixedSlots.map((slot) => {
        return (
          <div
            key={slot.key}
            className="slot"
            style={{
              gridColumn: "2 / -1",
              gridRow: slotToRow(slot as Slot),
              background: "blue",
            }}
          >
            {slot.type}
          </div>
        );
      })}
      {Object.entries(sessionsByRoom).map(([room, sessionsRoom], i) => {
        const gridColumn = i + 2 + " / " + (i + 2);
        return (
          <React.Fragment key={room}>
            <div
              className="slot"
              style={{
                gridColumn,
                gridRow: "1 / 1",
              }}
            >
              {room}
            </div>
            {sessionsRoom.map((session) => {
              const gridRow = slotToRow(session.slot);
              return (
                <MyLink
                  key={session.title}
                  to={"/sessions/" + session.key}
                  className="slot"
                  style={{
                    gridColumn,
                    gridRow,
                    background: "red",
                  }}
                >
                  <div>{session.title}</div>
                </MyLink>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

function slotToRow(slot: Slot) {
  const firstRow = 1;
  const rowStart = slot.display.row + firstRow;
  const spanRow = slot.display.size;
  return `${rowStart} / span ${spanRow}`;
}
