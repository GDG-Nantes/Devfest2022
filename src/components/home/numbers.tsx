import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export const DevfestNumbers = () => {
  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={2}
      justifyContent="center"
      margin="20px 0"
    >
      <Number label="attendees" value={3500} />
      <Number label="days" value={2} />
      <Number label="sessions" value={71} />
      <Number label="tracks" value={4} />
      <Number label="speakers" value={"90+"} />
    </Grid>
  );
};

const Number: React.FC<{ label: string; value: number | string }> = ({
  label,
  value,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.numbers",
  });

  return (
    <Grid item minWidth={100} xs={6} sm={6} md={4} lg={2}>
      <Stack textAlign="center">
        <Typography variant="h2" margin="10px 0">
          {value}
        </Typography>
        <p>{t(label)}</p>
      </Stack>
    </Grid>
  );
};
