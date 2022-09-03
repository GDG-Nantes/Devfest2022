import { Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import { PartialSession, rooms, Speakers, Tags } from "./common";
import "./schedule.scss";

export const LargeSchedule: React.FC<{
  sessions: PartialSession[];
  allHoursSlots: Slot[];
  fixedSlots: Slot[];
}> = ({ sessions, allHoursSlots, fixedSlots }) => {
  const hoursStart = allHoursSlots.map((slot) => slot.start);
  const hoursSlots = hoursStart.map(
    (start) => allHoursSlots.find((slot) => slot.start === start) as Slot
  );
  console.log(hoursSlots.map((slot) => slot.start));

  const sessionsByHours: { [k: string]: Array<PartialSession> } = {};
  const fixedSlotsByHours: { [k: string]: Array<Slot> } = {};
  hoursSlots.forEach((hourSlot) => {
    sessionsByHours[hourSlot.start] = sessions
      .filter((s) => s.slot.start === hourSlot.start)
      .sort((s1, s2) => rooms.indexOf(s1.room) - rooms.indexOf(s2.room));
    fixedSlotsByHours[hourSlot.start] = fixedSlots.filter(
      (s) => s.start === hourSlot.start
    );
  });

  return (
    <>
      <div className="header-rooms" />
      <div className="schedule-large">
        {rooms.map((room) => (
          <Room key={room} name={room} />
        ))}
        {hoursSlots.map((hourSlot) => {
          return (
            <React.Fragment key={hourSlot.start}>
              <Hour key={hourSlot.key} slot={hourSlot} />
              {fixedSlotsByHours[hourSlot.start].map((slot) => (
                <FixedSlot slot={slot} key={slot.key} />
              ))}
              {sessionsByHours[hourSlot.start].map((session) => (
                <Session session={session} key={session.key} />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

function columnFromRoom(room) {
  return rooms.indexOf(room) + 2 + " / " + (rooms.indexOf(room) + 2);
}

const Hour: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div
    className="slot"
    style={{
      gridColumn: "1 / 1",
      gridRow: slotToRow(slot as Slot),
    }}
  >
    <Typography variant="h3">{slot.start}</Typography>
  </div>
);

const FixedSlot: React.FC<{ slot: Slot }> = ({ slot }) => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.schedule" });
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
        zIndex: 0,
      }}
    >
      <Typography variant="h3">{t(slot.type)}</Typography>
    </div>
  );
};

const Room: React.FC<{ name: string }> = ({ name }) => {
  const gridColumn = columnFromRoom(name);
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

const Session: React.FC<{ session: PartialSession }> = ({ session }) => {
  const gridColumn = columnFromRoom(session.room);
  return (
    <MyLink
      key={session.title}
      to={"/sessions/" + session.key}
      className="slot session"
      style={{
        gridColumn,
        gridRow: slotToRow(session.slot),
        zIndex: 1,
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
      <span className="sr-only">Salle {session.room}</span>
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
