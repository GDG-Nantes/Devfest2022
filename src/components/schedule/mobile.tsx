import { Stack, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import { Flag } from "../commun/flags";
import { PartialSession, rooms, Speakers, Tags } from "./common";
import "./schedule.scss";

export const MobileSchedule: React.FC<{
  sessions: PartialSession[];
  allHoursSlots: Slot[];
  fixedSlots: Slot[];
}> = ({ sessions, allHoursSlots, fixedSlots }) => {
  const hours = allHoursSlots
    .map((slot) => slot.start) //
    // unicity
    .filter((start, i, l) => l.indexOf(start) === i);

  const sessionsByHours: { [k: string]: Array<PartialSession> } = {};
  const fixedSlotsByHours: { [k: string]: Array<Slot> } = {};
  hours.forEach((hour) => {
    sessionsByHours[hour] = sessions
      .filter((s) => s.slot.start === hour)
      .sort((s1, s2) => rooms.indexOf(s1.room) - rooms.indexOf(s2.room));
    fixedSlotsByHours[hour] = fixedSlots.filter((s) => s.start === hour);
  });

  return (
    <Stack direction="column" spacing={2} className="mobile-schedule">
      {hours.map((hour) => {
        return (
          <React.Fragment key={hour}>
            <Hour hour={hour} />
            {sessionsByHours[hour].map((session) => (
              <Session session={session} key={session.key} />
            ))}
            {fixedSlotsByHours[hour].map((slot) => (
              <FixedSlot slot={slot} key={slot.key} />
            ))}
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

const Hour: React.FC<{ hour: string }> = ({ hour }) => (
  <div className="hour">
    <Typography variant="h3">{hour}</Typography>
  </div>
);

const FixedSlot: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div className={classNames("slot", "fixed", slot.type)}>{slot.type}</div>
);

const Session: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <MyLink
      key={session.title}
      to={"/sessions/" + session.key}
      className="slot session"
    >
      <SessionInfo session={session} />
    </MyLink>
  );
};

const SessionInfo: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <div className="session-info">
      <span className="session-title">{session.title}</span>
      <Stack spacing={2} alignItems="center" direction="row">
        <Tags tags={session.tags} />
        <Flag lang={session.language} size="small" />
        <span>{session.room}</span>
      </Stack>
      <Speakers speakers={session.speakers} />
    </div>
  );
};
