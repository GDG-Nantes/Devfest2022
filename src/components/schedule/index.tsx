import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { slots } from "../../../data/slots.json";
import { Slot } from "../../../json_schemas/interfaces/schema_slots";
import { useResponsiveData } from "../../helpers/responsive";
import { PartialSession } from "./common";
import { LargeSchedule } from "./large";
import { MobileSchedule } from "./mobile";
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

  const sessions: PartialSession[] = allSessionsYaml.edges
    .map((x) => x.node)
    .filter((s) => s.slot.startsWith("day-" + day))
    .map((s) => ({
      ...s,
      slot: typedSlots.find((slot) => s.slot === slot.key),
    }));

  const allHoursSlots: Slot[] = typedSlots //
    .filter((s) => s.key.startsWith("day-" + day)) //
    .filter((s) => s.type !== "codelab");
  const fixedSlots: Slot[] = allHoursSlots.filter((s) =>
    ["opening", "lunch", "break", "keynote", "party"].includes(s.type)
  );

  const { isMobileOrTablet } = useResponsiveData();

  return isMobileOrTablet ? (
    <MobileSchedule
      sessions={sessions}
      allHoursSlots={allHoursSlots}
      fixedSlots={fixedSlots}
    />
  ) : (
    <LargeSchedule
      sessions={sessions}
      allHoursSlots={allHoursSlots}
      fixedSlots={fixedSlots}
    />
  );
};
