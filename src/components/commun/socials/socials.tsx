import {
  Facebook,
  GitHub,
  Language,
  LinkedIn,
  Twitter,
  YouTube
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { MyLink } from "../../../helpers/links";

export type SocialData =
  | {
      type: "linkedin" | "github" | "twitter" | "youtube" | "facebook";
      login: string;
    }
  | { type: "website"; url: string };

export const SocialLink: React.FC<
  SocialData & {
    withLogin?: boolean;
  }
> = ({ withLogin, ...social }) => {
  if (
    (social.type != "website" && social.login == null) ||
    (social.type == "website" && social.url == null)
  ) {
    return null;
  }

  let icon;
  let url;

  if (social.type === "linkedin") {
    icon = <LinkedIn />;
    url = `https://www.linkedin.com/in/${social.login}`;
  } else if (social.type === "github") {
    icon = <GitHub />;
    url = `https://github.com/${social.login}`;
  } else if (social.type === "twitter") {
    icon = <Twitter />;
    url = `https://twitter.com/${social.login}`;
  } else if (social.type === "youtube") {
    icon = <YouTube />;
    url = `https://youtube.com/user/${social.login}`;
  } else if (social.type === "facebook") {
    icon = <Facebook />;
    url = `https://facebook.com/${social.login}`;
  } else if (social.type === "website") {
    icon = <Language />;
    url = social.url;
  }

  return (
    <MyLink to={url} aria-label={social.type}>
      {withLogin ? (
        <Button
          variant="text"
          sx={{ color: "var(--primary-dark)" }}
          size="small"
          startIcon={
            <IconButton aria-label={social.type} color="inherit">
              {icon}
            </IconButton>
          }
        >
          {(social.type == "github" || social.type == "twitter") && social.login}
        </Button>
      ) : (
        <IconButton aria-label={social.type}>{icon}</IconButton>
      )}
    </MyLink>
  );
};
