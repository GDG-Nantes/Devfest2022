import { Typography } from "@mui/material";
import * as React from "react";
import { DefaultPage } from "../components/commun/page";

const jumbo = <Typography>October 20,21 2022</Typography>;

const IndexPage = () => (
  <DefaultPage
    title="Home"
    jumbo={jumbo}
    background={"back-neutre.jpg"}
  ></DefaultPage>
);

export default IndexPage;
