import { Email, Send } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { graphql, Link, useStaticQuery } from "gatsby";
import { useLocalization } from "gatsby-theme-i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import { SocialData, SocialLink } from "../components/commun/socials/socials";
import { MyLink } from "../helpers/links";
import { useResponsiveData } from "../helpers/responsive";
import "./footer.scss";

type FooterLink = { label: string; url: string };

export const Footer: React.FC = () => {
  const { isMobileOrTablet } = useResponsiveData();
  const { t } = useTranslation("translation", { keyPrefix: "footer" });
  const { t: tPages } = useTranslation("translation", { keyPrefix: "pages" });

  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "devfest_color_text_gray" }) {
        publicURL
      }
    }
  `);

  const socials: SocialData[] = [
    {
      login: "gdgnantes",
      type: "facebook",
    },
    {
      login: "devfestnantes",
      type: "twitter",
    },
    {
      login: "gdg-nantes",
      type: "linkedin",
    },
    {
      login: "francegdg",
      type: "youtube",
    },
  ];

  const aboutLinks: FooterLink[] = [
    {
      label: "GDG Nantes",
      url: "https://gdgnantes.com",
    },
    {
      label: "Google Developer Groups",
      url: "https://developers.google.com/",
    },
    {
      label: tPages("code-of-conduct.name"),
      url: "/code-of-conduct",
    },
    {
      label: tPages("legal-mentions.name"),
      url: "/legal-mentions",
    },
  ];

  const partnersLinks: FooterLink[] = [
    {
      label: t("partnership-kit"),
      url: "https://drive.google.com/drive/folders/1mG8fire3iGouszXyS3nxyNf3L0VYpGfa",
    },
    {
      label: t("media-kit"),
      url: "https://drive.google.com/drive/folders/1Qpe0mmD2btdEIVAIEUlJh081CUdyd5z3",
    },
  ];

  const previousEditions: FooterLink[] = [2021, 2020, 2019, 2018].map(
    (year) => ({
      url: `https://devfest${year}.gdgnantes.com`,
      label: "Devfest Nantes " + year,
    })
  );

  return (
    <footer>
      <Container className={"section"}>
        <Grid container rowSpacing={isMobileOrTablet ? 5 : 10}>
          <FooterItem title={t("follow")} size="half">
            <div className="socials">
              {socials.map((social) => (
                <SocialLink key={social.type} {...social} />
              ))}
            </div>
          </FooterItem>

          <FooterItem size="half">
            <Link to="mailto:bureau@gdgnantes.com">
              <Button className="footer-title">
                <IconButton>
                  <Email style={{ color: "white" }} />
                </IconButton>
                bureau@gdgnantes.com
              </Button>
            </Link>
          </FooterItem>

          <FooterItem title={t("about")} links={aboutLinks} />
          <FooterItem title={t("previous-editions")} links={previousEditions} />
          <FooterItem title={t("partners")} links={partnersLinks} />

          <FooterItem title="Newsletter">
            <p>{t("no-spam")}</p>
            <MyLink to="https://gdgnantes.us9.list-manage.com/subscribe/post?u=b44affc3cdfd00b20bcae502c&amp;amp;id=e0e7ceee5d">
              <Button variant="contained">
                <Send style={{ marginRight: "20px" }} /> {t("news-button")}
              </Button>
            </MyLink>
          </FooterItem>

          <FooterItem size="full">
            <div>
              <img src={logo.file.publicURL} alt="logo defvest" height="50px" />
              <p>{t("organizers")}</p>
            </div>
          </FooterItem>
        </Grid>
      </Container>
    </footer>
  );
};

const FooterItem: React.FC<{
  title?: string;
  links?: FooterLink[];
  size?: "half" | "fourth" | "full";
}> = ({ children, title, links, size = "fourth" }) => {
  const mediaSize: { xs?: number; sm?: number; lg?: number } =
    size == "half"
      ? { xs: 12, sm: 6 }
      : size == "full"
      ? { xs: 12 }
      : { xs: 12, sm: 6, lg: 3 };
  return (
    <Grid item {...mediaSize} textAlign="center" paddingLeft="0">
      {title && (
        <Typography variant="h3" className="footer-title">
          {title}
        </Typography>
      )}
      {links && <FooterLinks links={links} />}
      {children}
    </Grid>
  );
};

const FooterLinks: React.FC<{ links: FooterLink[] }> = ({ links }) => {
  const { locale } = useLocalization();
  return (
    <List dense>
      {links.map(({ label, url }) => (
        <MyLink to={url}>
          <ListItem style={{ justifyContent: "center" }}>{label}</ListItem>
        </MyLink>
      ))}
    </List>
  );
};
