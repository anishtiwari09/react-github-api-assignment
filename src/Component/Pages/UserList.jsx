import React, { useEffect, useState } from "react";
import { getAllUser } from "../../api";
import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import Profile from "../UIComponent/Profile/Profile";
const perPage = 16;
export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const fetchUserData = async (page, perPage) => {
    setErrorMsg("");
    setLoading(true);
    setUserData([]);
    try {
      let data = await getAllUser({
        page: (page - 1) * perPage,
        per_page: perPage,
      });
      let resultData = await data.json();
      setLoading(false);
      if (data.status > 400) {
        setUserData([]);
        setErrorMsg(resultData?.message);
      } else {
        if (resultData?.length) {
          setUserData(resultData);
        }
      }
    } catch (e) {
      setLoading(false);
      setUserData([]);
    }
  };
  useEffect(() => {
    fetchUserData(page, perPage);
  }, []);
  const handlePageChange = (e, value) => {
    setPage(value);
    if (value > maxPage) setMaxPage(value);
    fetchUserData(Number(value), perPage);
  };
  return (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={"100%"} />
          <div style={{ padding: 5 }}></div>
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={window.innerHeight - 45}
            style={{ boxSizing: "border-box" }}
          />
        </React.Fragment>
      ) : userData?.length ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12, xl: 12 }}
        >
          {userData.map((item, key) => (
            <Grid item xs={1} sm={4} md={4} xl={3} key={item.login}>
              <Profile login={item?.login} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Typography variant="h4" component="div">
            {errorMsg ? errorMsg : "No Data Found..."}
          </Typography>
        </div>
      )}{" "}
      <Box width={"100%"} sx={{ marginTop: "1rem" }}>
        <Pagination
          count={userData?.length ? maxPage + 1 : maxPage}
          color="secondary"
          sx={{ width: "fit-content", margin: "auto" }}
          onChange={handlePageChange}
        />
      </Box>
    </React.Fragment>
  );
}
