import { Check, ExpandMore, StopCircle } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MenuFR from "../../../data/menu/menu-fr.json";
import { Allergene } from "../../../json_schemas/interfaces/schema_menu";
import { DefaultSection } from "../commun/section/section";
import "./styles.scss";

const ALLERGENES: Allergene[] = ["allergene1", "allergene1", "allergene1"];

export const MenuTraiteur: React.FC = () => {
  return (
    <>
      {Object.entries(MenuFR).map(([jour, sectionsJour], i) => (
        <DefaultSection
          padding="none"
          key={jour}
          variant={i % 2 == 0 ? "primary" : "secondary"}
        >
          <Typography variant="h2">{jour}</Typography>

          {sectionsJour.map((section) => (
            <Box key={section.titre}>
              <Typography variant="h4">{section.titre}</Typography>
              {section.plats.map((plat) => (
                <Accordion key={plat.titre}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="voir les allergenes"
                  >
                    <Typography variant="h4">{plat.titre}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction="row" spacing={2}>
                      {ALLERGENES.map((allergene) => (
                        <Stack key={allergene}>
                          <Typography variant="h5">{allergene}</Typography>
                          {plat.allergenes.includes(allergene) ? (
                            <StopCircle />
                          ) : (
                            <Check />
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
        </DefaultSection>
      ))}
    </>
  );
};
