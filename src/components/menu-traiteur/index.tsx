import { Check, StopCircle } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import MenuFR from "../../../data/menu/menu-fr.json";
import { Allergene } from "../../../json_schemas/interfaces/schema_menu";
import { DefaultSection } from "../commun/section/section";

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
          <Table size="small" aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell component="th" sx={{ maxWidth: "50%" }}>
                  Nom
                </TableCell>
                {ALLERGENES.map((allergene) => (
                  <TableCell key={allergene}>{allergene}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sectionsJour.map((section) => (
                <>
                  <TableRow style={{ backgroundColor: "var(--primary-dark)" }}>
                    <TableCell component="th" colSpan={ALLERGENES.length + 1}>
                      {section.titre}
                    </TableCell>
                  </TableRow>
                  {section.plats.map((plat) => (
                    <TableRow key={plat.titre}>
                      <TableCell component="th" sx={{ maxWidth: "50%" }}>
                        {plat.titre}
                      </TableCell>
                      {ALLERGENES.map((allergene) => (
                        <TableCell key={plat.titre + "-" + allergene}>
                          {plat.allergenes.includes(allergene) ? (
                            <StopCircle />
                          ) : (
                            <Check />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </DefaultSection>
      ))}
    </>
  );
};
