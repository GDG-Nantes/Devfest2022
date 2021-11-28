import { Typography } from "@mui/material";
import * as React from "react";
import { DefaultPage } from "../components/commun/page";

const jumboLost = (
  <Typography variant="h1">Vous avez l'air perdus...</Typography>
);

const NotFoundPage = () => (
  <DefaultPage
    jumbo={jumboLost}
    title="Not Found"
    background="back-neutre.jpg"
  />
);

export default NotFoundPage;
