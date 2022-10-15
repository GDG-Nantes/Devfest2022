import { Check, Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { StaticImage } from "gatsby-plugin-image";
import { useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import MenuFR from "../../../data/menu/menu-traiteur.json";
import { Allergene } from "../../../json_schemas/interfaces/schema_menu";
import { MyLink } from "../../helpers/links";
import { DefaultSection, TertiarySection } from "../commun/section/section";
import "./styles.scss";

const ALLERGENES: Allergene[] = [
  "gluten",
  "crustaces",
  "vegetarien",
  "oeufs",
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
  const refVendredi = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (
      refVendredi.current &&
      new Date().toLocaleDateString("fr") === "21/10/2022"
    ) {
      refVendredi.current.scrollIntoView();
    }
  }, [refVendredi]);
  return (
    <>
      {Object.entries(MenuFR).map(([jour, sectionsJour], i) => (
        <DefaultSection padding="none" key={jour} variant="primary">
          {i !== 0 && <Divider />}
          <Typography
            variant="h2"
            ref={jour == "Vendredi" ? refVendredi : null}
          >
            {jour}
          </Typography>
          {sectionsJour.map((section) => (
            <SectionMenu key={section.titreFR} section={section} />
          ))}
        </DefaultSection>
      ))}
      <TertiarySection padding="none">
        <MyLink
          to="https://lamaisonhebel.fr/"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <StaticImage
            alt="La Maison Hebel"
            src="https://lamaisonhebel.fr/wp-content/themes/hebel/hebel_img/logo.png"
            objectFit="contain"
            style={{ width: "90%", height: "250px", maxWidth: "500px" }}
            layout="constrained"
          />
        </MyLink>
      </TertiarySection>
    </>
  );
};

type TypeSectionMenu = typeof MenuFR["Jeudi"][0];

const SectionMenu: React.FC<{ section: TypeSectionMenu }> = ({ section }) => {
  const { locale } = useLocalization();

  const keyTitre = locale === "fr" ? "titreFR" : "titreEN";
  return (
    <Box key={section.titreFR}>
      <Typography
        variant="h3"
        style={{ marginTop: "20px", marginBottom: "5px" }}
      >
        {section[keyTitre]}
      </Typography>
      {section.plats.map((plat) => (
        <Accordion key={plat.titreFR}>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "white" }} />}
            aria-controls="voir les allergenes"
            style={{
              backgroundColor: "var(--primary-dark)",
            }}
          >
            <Typography variant="h4">{plat[keyTitre]}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "var(--secondary)",
            }}
          >
            <AllergenesPlat plat={plat} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

type TypePlat = TypeSectionMenu["plats"][0];
const AllergenesPlat: React.FC<{ plat: TypePlat }> = ({ plat }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.menu.allergenes",
  });
  return (
    <Stack direction="row" justifyContent="center" flexWrap="wrap">
      {ALLERGENES.sort((a1, a2) => (plat.allergenes.includes(a2) ? 1 : -1)).map(
        (allergene) => {
          const isAllergeneKo = plat.allergenes.includes(allergene);
          return (
            <Box
              key={allergene}
              className={classNames(
                "allergene",
                isAllergeneKo && "allergeneKO"
              )}
            >
              <Stack
                alignItems="center"
                width="75px"
                height="100%"
                justifyContent="space-between"
              >
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  style={{
                    lineHeight: "1",
                    fontSize: "0.8rem",
                  }}
                >
                  {t(allergene)}
                </Typography>
                {isAllergeneKo ? <Close /> : <Check />}
              </Stack>
            </Box>
          );
        }
      )}
    </Stack>
  );
};
