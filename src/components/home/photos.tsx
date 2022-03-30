import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export const DevfestPhotos = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      margin="30px 0"
      justifyContent="space-around"
      divider={<Divider orientation="vertical" flexItem variant="middle" />}
      spacing={2}
    >
      <Number label="attendees" value={2000} />
      <Number label="days" value={2} />
      <Number label="sessions" value={69} />
      <Number label="tracks" value={4} />
      <Number label="speakers" value={"90+"} />
    </Stack>
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
    <Stack textAlign="center">
      <Typography variant="h2" margin="20px 0">
        {value}
      </Typography>
      <p>{t(label)}</p>
    </Stack>
  );
};
