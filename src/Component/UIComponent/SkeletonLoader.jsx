import { Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonLoader() {
  return (
    <React.Fragment>
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem" }}
        width={"100%"}
        animation={"wave"}
      />
      <div style={{ padding: 5 }}></div>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={window.innerHeight - 45}
        style={{ boxSizing: "border-box" }}
        animation={"wave"}
      />
    </React.Fragment>
  );
}
