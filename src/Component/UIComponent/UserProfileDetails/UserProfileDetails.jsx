import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function UserProfileDetails({ user }) {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <React.Fragment>
            {" "}
            <Typography variant="h5" component="div" textAlign={"center"}>
              {user?.name ?? user?.first_name ?? "Private User"}
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
            <Stack textAlign={"center"} spacing={{ sm: 1 }}>
              <Typography
                sx={{ mt: 1.5 }}
                textAlign={"center"}
                color="text.secondary"
              >
                {user?.login}
              </Typography>
              {user?.bio && <Typography>{user?.bio}</Typography>}
              <Typography mt={2}>
                <strong>Company: </strong> {user.company}
              </Typography>
              {user.twitter_username && (
                <Typography style={{ marginTop: 40 }}>
                  <strong>Twitter: </strong> {user.twitter_username}
                </Typography>
              )}
              {user.blog && (
                <Typography>
                  <strong>Twitter: </strong> {user.blog}
                </Typography>
              )}
              <Typography>
                <strong>{user?.public_repos}</strong> Public Repositories
              </Typography>
              <Stack
                direction="row"
                spacing={{ sm: 4 }}
                width={"fit-content"}
                style={{ margin: "auto", marginTop: "10px" }}
              >
                <Typography>
                  <strong>{user.followers} </strong> Followers
                </Typography>

                <Typography>
                  <strong>{user.following}</strong> Following
                </Typography>
              </Stack>
            </Stack>
            <CardActions>
              <Link style={{ margin: "auto" }} to={`/userList`}>
                <Button size="small">Hide Details</Button>
              </Link>
            </CardActions>
          </React.Fragment>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
