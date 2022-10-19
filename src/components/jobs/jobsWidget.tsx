import React from "react";
import { Helmet } from "react-helmet";

export const JobsWidget = () => {
  return (
    <>
      <Helmet>
        <script
          type="module"
          src="https://widget.welovedevs.com/jobs-widget.js"
        ></script>
        <style>
          {`* {
          --w3d-main-color: #c14d32;
          --w3d-accent-color: #fff;
      }`}
        </style>
      </Helmet>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "700px", overflow: "hidden" }}>
          {/* @ts-ignore */}
          <jobs-widget
            locale="fr"
            items="150"
            hidepartnership="false"
            hidefooter="false"
            referralcode="GDGNantes"
            customAlgoliaFilters="inSelections.-NDhWt3fwP2jee_n16t9 > 0"
            eventMode="true"
          />
        </div>
      </div>
    </>
  );
};
