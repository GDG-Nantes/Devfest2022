import { Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { Rooms } from "../../../json_schemas/interfaces/schema_sessions";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import { PartialSession, rooms, Speakers, Tags } from "./common";
import "./schedule.scss";

export const LargeSchedule: React.FC<{
  sessions: PartialSession[];
  allHoursSlots: Slot[];
  fixedSlots: Slot[];
}> = ({ sessions, allHoursSlots, fixedSlots }) => {
  const sessionsByRoom: { [k in Rooms]: PartialSession[] } = {} as any;
  rooms.forEach((room) => {
    sessionsByRoom[room] = sessions.filter((s) => s.room === room);
  });

  return (
    <div className="schedule-large">
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

const FixedSlot: React.FC<{ slot: Slot }> = ({ slot }) => {
  const gridColumn = slot.type.startsWith("keynote")
    ? "2 / 2"
    : slot.display.notForCodelab
    ? "2 / span 4"
    : "2 / -1";
  return (
    <div
      className={classNames("slot", "fixed", slot.type)}
      style={{
        gridColumn,
        gridRow: slotToRow(slot as Slot),
      }}
    >
      {slot.type}
    </div>
  );
};

const Room: React.FC<{ name: string; gridColumn: string }> = ({
  name,
  gridColumn,
}) => {
  return (
    <div
      className="slot room"
      style={{
        gridColumn,
        gridRow: "1 / 1",
      }}
    >
      <Typography variant="h3">{name}</Typography>
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
      className="slot session"
      style={{
        gridColumn,
        gridRow: slotToRow(session.slot),
      }}
    >
      <SessionInfo session={session} />
    </MyLink>
  );
};

const SessionInfo: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <div className="session-info">
      <span className="session-title">{session.title}</span>
      <div className="session-info-bottom">
        <Tags tags={session.tags} />
        <Speakers speakers={session.speakers} />
      </div>
    </div>
  );
};

function slotToRow(slot: Slot) {
  const firstRow = 1;
  const rowStart = slot.display.row + firstRow;
  const spanRow = slot.display.size;
  return `${rowStart} / span ${spanRow}`;
}
