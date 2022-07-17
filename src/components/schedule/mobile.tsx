import React from "react";
import { Rooms } from "../../../json_schemas/interfaces/schema_sessions";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import { PartialSession, rooms } from "./common";
import "./schedule.scss";

export const MobileSchedule: React.FC<{
  sessions: PartialSession[];
  allHoursSlots: Slot[];
  fixedSlots: Slot[];
}> = ({ sessions, allHoursSlots, fixedSlots }) => {
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

  return (
    <div style={gridStyle}>
      {allHoursSlots.map((slot) => (
        <Hour key={slot.key} slot={slot} />
      ))}
      {fixedSlots.map((slot) => (
        <FixedSlot slot={slot} key={slot.key} />
      ))}
      {Object.entries(sessionsByRoom).map(([room, sessionsRoom], i) => {
        const gridColumn = i + 2 + " / " + (i + 2);
        return (
          <React.Fragment key={room}>
            <Room name={room} gridColumn={gridColumn} />
            {sessionsRoom.map((session) => (
              <Session
                session={session}
                gridColumn={gridColumn}
                key={session.title}
              />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Hour: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div
    className="slot"
    style={{
      gridColumn: "1 / 1",
      gridRow: slotToRow(slot as Slot),
    }}
  >
    {slot.start}
  </div>
);

const FixedSlot: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div
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

const Room: React.FC<{ name: string; gridColumn: string }> = ({
  name,
  gridColumn,
}) => {
  return (
    <div
      className="slot"
      style={{
        gridColumn,
        gridRow: "1 / 1",
      }}
    >
      {name}
    </div>
  );
};

const Session: React.FC<{ session: PartialSession; gridColumn: string }> = ({
  session,
  gridColumn,
}) => {
  return (
    <MyLink
      key={session.title}
      to={"/sessions/" + session.key}
      className="slot"
      style={{
        gridColumn,
        gridRow: slotToRow(session.slot),
        background: "red",
      }}
    >
      <div>{session.title}</div>
    </MyLink>
  );
};

function slotToRow(slot: Slot) {
  const firstRow = 1;
  const rowStart = slot.display.row + firstRow;
  const spanRow = slot.display.size;
  return `${rowStart} / span ${spanRow}`;
}
