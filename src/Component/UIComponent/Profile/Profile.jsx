import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Skeleton } from "@mui/material";
import { findSpecificUserDetails } from "../../../api";
import { Link } from "react-router-dom";
export default function Profile({ login }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const findUserDetails = async (username) => {
    let data = await findSpecificUserDetails(username);
    data = await data.json();
    setUser({ ...data });
    setLoading(false);
  };
  useEffect(() => {
    findUserDetails(login);
  }, []);
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <React.Fragment>
              {" "}
              <Typography variant="h5" component="div" textAlign={"center"}>
                {user?.name ?? "Private User"}
              </Typography>
              <Avatar
                src={user?.avatar_url}
                sx={{
                  margin: "auto",
                  width: 80,

                  height: 80,
                  marginTop: 1,
                }}
              ></Avatar>
              {/* <img src={user?.avatar_url} /> */}
              <Typography
                sx={{ mt: 1.5 }}
                textAlign={"center"}
                color="text.secondary"
              >
                <strong>UserName: </strong>
                {user?.login}
              </Typography>
              <CardActions>
                <Link
                  style={{ margin: "auto" }}
                  to={`/userDetails/${user.login}`}
                >
                  <Button size="small">View Details</Button>
                </Link>
              </CardActions>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
