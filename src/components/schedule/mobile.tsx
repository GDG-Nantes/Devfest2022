import React from "react";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { MyLink } from "../../helpers/links";
import { PartialSession, Speakers, Tags } from "./common";
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
    sessionsByHours[hour] = sessions.filter((s) => s.slot.start === hour);
    fixedSlotsByHours[hour] = fixedSlots.filter((s) => s.start === hour);
  });

  return (
    <div>
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
    </div>
  );
};

const Hour: React.FC<{ hour: string }> = ({ hour }) => (
  <div className="hour">{hour}</div>
);

const FixedSlot: React.FC<{ slot: Slot }> = ({ slot }) => (
  <div className="slot">{slot.type}</div>
);

const Session: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <MyLink
      key={session.title}
      to={"/sessions/" + session.key}
      className="slot"
    >
      <SessionInfo session={session} />
    </MyLink>
  );
};

const SessionInfo: React.FC<{ session: PartialSession }> = ({ session }) => {
  return (
    <div className="session-info">
      <div className="session-info-top">
        <span className=".session-title">{session.title}</span>
        <Tags tags={session.tags} />
        {session.room}
      </div>
      <Speakers speakers={session.speakers} />
    </div>
  );
};
