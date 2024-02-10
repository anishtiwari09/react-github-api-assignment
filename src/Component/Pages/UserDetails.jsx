import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserProfileDetails from "../UIComponent/UserProfileDetails/UserProfileDetails";
import { findSpecificUserDetails } from "../../api";
import SkeletonLoader from "../UIComponent/SkeletonLoader";
import ErrorMessageShower from "../UIComponent/ErrorMessageShower";

export default function UserDetails() {
  const { id: userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fetchUserData = async (userName) => {
    setUserData("");
    setLoading(true);
    setErrorMsg("");
    let data = await findSpecificUserDetails(userName);
    let resultData = await data.json();
    setLoading(false);
    if (data.status > 400) {
      setErrorMsg(data?.messaeg);
    } else {
      setUserData(resultData);
    }
  };
  useEffect(() => {
    if (userName) {
      fetchUserData(userName);
    }
  }, []);
  return (
    <React.Fragment>
      <Link to={"/userList"}>
        <Button variant="contained" color="secondary">
          Back
        </Button>
      </Link>

      {loading ? (
        <SkeletonLoader />
      ) : userData ? (
        <div>
          <Box mt={4} minWidth={450} width={"fit-content"} margin={"auto"}>
            <UserProfileDetails user={userData} />
          </Box>
        </div>
      ) : (
        <React.Fragment>
          <ErrorMessageShower errorMsg={errorMsg || "Invalid Request Found"} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
