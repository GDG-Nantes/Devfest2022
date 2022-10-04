import { Grid, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink } from "../../helpers/links";

export const Tickets = () => {
  const disabled1st = true;
  const disabled2nd = true;

  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={3}
      margin="20px 0"
      justifyContent="center"
      className="tickets"
    >
      <Ticket
        labelKey="2days-2nd"
        price={99}
        quantity={1000}
        disabled={disabled2nd}
      />
      <Ticket
        labelKey="2daysEarly"
        price={78}
        quantity={600}
        disabled={disabled1st}
      />
      <Ticket
        labelKey="2days-1st"
        price={99}
        quantity={800}
        disabled={disabled1st}
      />
      <Ticket
        labelKey="1day"
        price={60}
        quantity={500}
        disabled={disabled1st}
      />
      <Ticket
        labelKey="reduced"
        price={20}
        quantity={200}
        disabled={disabled1st}
      />
    </Grid>
  );
};

const Ticket: React.FC<{
  price: number;
  labelKey: string;
  quantity: number;
  disabled: boolean;
}> = ({ labelKey, price, quantity, disabled }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "pages.home.tickets",
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <MyLink
        to="https://www.billetweb.fr/devfest-Nantes"
        style={{ cursor: "default" }}
      >
        <div className={classNames("ticket", disabled && "disabled")}>
          <div className="ticket-wrapper">
            <div className="ticket-body">
              <div className="price">
                <Typography variant="h2">{price} €</Typography>
                <hr />
              </div>
              <div className="description">
                <p className="label">{t(labelKey)}</p>
                <p className="quantity">{quantity} places</p>
              </div>
            </div>
          </div>
        </div>
      </MyLink>
    </Grid>
  );
};
