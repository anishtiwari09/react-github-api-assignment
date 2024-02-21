import React, { useEffect, useState } from "react";
import { getAllUser } from "../../api";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Profile from "../UIComponent/Profile/Profile";
import SkeletonLoader from "../UIComponent/SkeletonLoader";
import ErrorMessageShower from "../UIComponent/ErrorMessageShower";
const perPage = 16;
export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [backupInitialState, setBackupInitialState] = useState([]);
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
        setBackupInitialState([]);
        setUserData([]);
        setErrorMsg(resultData?.message);
      } else {
        if (resultData?.length) {
          setBackupInitialState(resultData);
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
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const handleChange = (e, type) => {
    console.log(e.target.value);
    if (type === "name") {
      setName(e.target.value);
    } else {
      setLocation(e.target.value);
    }
  };
  const fetchDetails = async (name, location) => {
    let queryParams = "";

    if (!name && !location) {
      setUserData(backupInitialState);
      return;
    }
    if (name) {
      queryParams = name;
    }
    if (location) {
      if (name) queryParams += "+";
      queryParams += "location:" + location;
    }
    try {
      let data = await fetch(
        `https://api.github.com/search/users?q=${queryParams}`
      );
      data = await data.json();

      setUserData(data?.items || []);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSearch = () => {
    fetchDetails(name, location);
  };
  return (
    <React.Fragment>
      <div>
        <TextField
          type={"text"}
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />

        {/* input field for name */}

        <TextField
          type={"text"}
          value={location}
          onChange={(e) => handleChange(e, "location")}
        />

        <Button onClick={handleSearch}>Search</Button>
      </div>
      {loading ? (
        <SkeletonLoader />
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
        <ErrorMessageShower
          errorMsg={errorMsg ? errorMsg : "No Data Found..."}
        />
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
