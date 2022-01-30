import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import "./home.scss";

export const HomeJumbo = () => {
  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "devfest_color_text_white" }) {
        publicURL
      }
    }
  `);

  return (
    <>
      <img className="logo-jumbo-home" alt="logo" src={logo.file.publicURL} />

      <Typography variant="h2" className="primary">
        October 20,21 2022
      </Typography>
      <Typography variant="h3" className="primary">
        Cité des Congrès, Nantes, France
      </Typography>
    </>
  );
};
