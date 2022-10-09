import { Check, Close, ExpandMore } from "@mui/icons-material";
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

const ALLERGENES: Allergene[] = [
  "gluten",
  "crustaces",
  "vegetarien",
  "œufs",
  "poissons",
  "arachides",
  "soja",
  "lactose",
  "fruits-a-coques",
  "celeri",
  "moutarde",
  "sesame",
  "sulfites",
  "lupin",
  "mollusques",
];

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
                    sx={{
                      backgroundColor: "var(--primary-dark)",
                    }}
                  >
                    <Typography variant="h4">{plat.titre}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "var(--secondary)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                    >
                      {ALLERGENES.map((allergene) => (
                        <Stack key={allergene} alignItems="center">
                          <Typography variant="body1">{allergene}</Typography>
                          {plat.allergenes.includes(allergene) ? (
                            <Close />
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
