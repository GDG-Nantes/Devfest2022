import { GitHub, Language, LinkedIn, Twitter } from "@mui/icons-material";
import { IconButton, Link } from "@mui/material";
import React from "react";

type SocialData = {
  type: "linkedin" | "github" | "twitter" | "website";
  login: string;
  url?: string;
};
export const SocialLink: React.FC<SocialData> = ({ type, login, url }) => {
  let icon;

  if (type === "linkedin") {
    icon = <LinkedIn />;
    url = `https://www.linkedin.com/in/${login}`;
  } else if (type === "github") {
    icon = <GitHub />;
    url = `https://github.com/${login}`;
  } else if (type === "twitter") {
    icon = <Twitter />;
    url = `https://twitter.com/${login}`;
  } else {
    icon = <Language />;
  }

  return (
    <Link href={url} target="_blank">
      <IconButton>{icon}</IconButton>
    </Link>
  );
};
