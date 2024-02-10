import { Typography } from "@mui/material";
import React from "react";

export default function ErrorMessageShower({ errorMsg }) {
  return (
    <div>
      <Typography variant="h4" component="div">
        {errorMsg}
      </Typography>
    </div>
  );
}
