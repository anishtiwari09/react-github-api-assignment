import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  console.log("working");
  return (
    <div>
      <Typography variant="h4" textAlign={"center"}>
        404
        <br />
        Page Not found
      </Typography>
      <Link
        to={"/userList"}
        style={{ textAlign: "Center", margin: "10px", display: "block" }}
      >
        <Button variant="contained" color="secondary">
          Back To Home
        </Button>
      </Link>
    </div>
  );
}
